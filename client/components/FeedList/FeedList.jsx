// Perhaps this component should be called FeedData instead and
// then it only handles data and passes it down to FeedList which
// then handles itterating over the FeedItems ? TODO

/*global Posts, FeedItem */

this.FeedList = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getInitialState() {
    return {
      limits: {
        posts: 2
      //postComments: 5 TODO
      },

      fieldsNeeded: {
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
      }
    };
  },

  componentWillMount() {
    this._hasStartedSubscription = false;
    console.log("Waiting for children to subscribe to fields...", Date.now());

    setTimeout(() => {
      this._hasStartedSubscription = true;
      this.startMeteorSubscriptions();
    }, 1000);
  },

  // subscribe to a reactive stream of data from
  // publication at:  server/publications/posts.js
  startMeteorSubscriptions() {
    if (!this._hasStartedSubscription) {
      return;
    }
    console.log("Running feed subscription", Date.now());
    return Meteor.subscribe("feed", this.state.fieldsNeeded, this.state.limits);
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
            var comments = PostComments.find({postId: doc._id}, {sort: {createdAt: -1}}).fetch();

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

