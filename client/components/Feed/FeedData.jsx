// FeedData handles all data subscriptions and pushes data down to
// children via props. Ideally all child state should be here too

/*global Posts, FeedList */

this.FeedData = React.createClass({
  mixins: [ReactMeteor.Mixin],

  getInitialState() {
    return {
      limits: {
        posts: 5
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
    this.startMeteorSubscriptions();
  },

  // subscribe to a reactive stream of data from
  // publication at:  server/publications/posts.js
  startMeteorSubscriptions() {
    var postIds = this.state.postIds;
    console.log(postIds);
    return Meteor.subscribe("feed", this.state.fieldsNeeded, this.state.limits, postIds);
  },

  // track changes in MiniMongo data store and merge with this.state
  // when they change. If new data is sent down from the publication
  // this will still update to keep in sync with this.state
  getMeteorState: function() {
    return {
      postItems: Posts.find({}, {sort: {createdAt: -1}}).fetch() || [],
      allComments: PostComments.find().fetch(),
      postIds: Posts.find({}, {fields: {_id: 1}}).map(doc => doc._id)
    };
  },

  incrementLimit() {
    var limits = _.extend({}, this.state.limits);
    limits.posts = limits.posts + 2;

    this.setState({limits: limits });
    return this.state;
  },

  render() {
    console.log("ids", this.state.postIds);
    return <FeedList postItems={this.state.postItems} {...this.props} />;
  }
});

