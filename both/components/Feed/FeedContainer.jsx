// FeedData handles all data subscriptions and pushes data down to
// children via props.
//
// This component is a container or 'view controller' and will gather
// any data needed from the domain objects and handle subscriptions
//
// In a future version the children will be able to specify what fields
// they need, however currently they're stored in this component.

/*global FeedList, ReactMeteorData, FeedDomain */

this.FeedContainer = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      recordCount: {
        posts: 5
        //postComments: 5 XXX no comment limit
      },

      // TODO have this component grab children's needed fields
      // from their statics object
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

  // subscribe to a reactive stream of data from
  // publication at:  server/publications/posts.js
  startMeteorSubscriptions() {
    var fields = this.state.fieldsNeeded;
    var postIds = this.data.postIds;
    var recordCount = this.state.recordCount;
    return Meteor.subscribe("feed", fields, recordCount, postIds);
  },

  // re-renders view if any reactive data source changes. `sub` is reactive
  // and will change when any new data is availible from subscription.
  getMeteorData: function() {
    var sub = this.startMeteorSubscriptions();

    return {
      feedReady: sub.ready(),
      postItems: FeedDomain.getAllFeedPosts(),
      postIds: FeedDomain.getPostCommentIds()
    };
  },

  // pass this down to children so they can increase the limit when needed
  incrementLimit() {
    var limits = _.extend({}, this.state.recordCount);
    limits.posts = limits.posts + 5;

    this.setState({recordCount: limits});
    return this.state;
  },

  render() {
    return <FeedList
      incrementLimit={this.incrementLimit}
      postItems={this.data.postItems}
    />;
  }
});
