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
    var limits = _.extend({}, this.state.limits);
    limits.posts = limits.posts + 2;

    this.setState({limits: limits });
    return this.state;
  },

  render() {
    return <FeedList postItems={this.state.postItems} {...this.props} />;
  }
});

