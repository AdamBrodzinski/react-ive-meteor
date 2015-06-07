/*global Posts, FeedItem */
var PureRender = React.addons.PureRenderMixin;

this.FeedList = React.createClass({
  mixins: [ReactMeteor.Mixin],

  componentWillMount() {
    this.startMeteorSubscriptions();
  },

  getInitialState() {
    return { postLimit: 2 };
  },

  // subscribe to a reactive stream of data from
  // publication at:  server/publications/posts.js
  startMeteorSubscriptions() {
    console.log('[FeedList] subscribing to data');
    // TODO implement a relay/graphql type of system
    var fieldsNeeded = {
      posts: {
        _id: true,
        desc: true,
        likeCount: true,
        commentCount: true,
        userName: true,
        createdAt: true,
        ownerId: true,
      },
      postComments: {
        _id: true,
        createdAt: true,
        username: true,
        desc: true,
        postId: true,
      }
    };

    var limits = {
      posts: this.state.postLimit
    };

    return Meteor.subscribe("feed", fieldsNeeded, limits);
  },

  // track changes in MiniMongo data store and merge with this.state
  // when they change. If new data is sent down from the publication
  // this will still update to keep in sync with this.state
  getMeteorState: function() {
    return {
      postItems: Posts.find({}, {sort: {createdAt: -1}}).fetch() || [],
      allComments: PostComments.find().fetch()
    };
  },

  incrementLimit() {
    var currLimit = this.state.postLimit;
    this.setState({postLimit: currLimit + 3});
    return this.state;
  },

  render() {
    console.log("[FeedList] Rendering");
    return (
      <div>
        {
          this.state.postItems.map(doc => {
            // pull comments from MiniMongo client store
            var comments = PostComments.find({postId: doc._id}).fetch();

            return <FeedItem key={doc._id}
              { ...doc }
              comments={ comments }
              destroyPost={ doc.destroy }
              createComment={ PostComment.create }
            />;
          })
        }
        <button className='more-btn'
            onClick={this.incrementLimit}>
          Load More
        </button>
      </div>
    );
  }
});

