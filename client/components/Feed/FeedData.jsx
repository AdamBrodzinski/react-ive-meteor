// FeedData handles all data subscriptions and pushes data down to
// children via props. Ideally all child state should be here too and
// then be passed downward.
//
// ** Note ** this is designed to be a very simple replacement for
// Flux's Dispatcher and Stores. This component will call any models
// or any other things needed. Essentially it's a view controller but
// the point is to keep it simple for smaller apps. Flux/Relay is ideal
// for large apps.
//
// This file will have basic functionality for getting children's
// required fields from their statics to help underfetching data. This
// commit has them hard coded below due to a time crunch.

/*global Posts, FeedList */

this.FeedData = React.createClass({
  mixins: [ReactMeteor.Mixin],

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

  componentWillMount() {
    this.startMeteorSubscriptions();
  },


  // subscribe to a reactive stream of data from
  // publication at:  server/publications/posts.js
  startMeteorSubscriptions() {
    // pass in postIds so we can subscribe to comments for all posts in
    // local cache, TODO, fix mongo query to do this all at one time
    return Meteor.subscribe("feed", this.state.fieldsNeeded,
                            this.state.recordCount, this.state.postIds);
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

  // pass this down to children so they can increase the limit when needed
  incrementLimit() {
    var limits = _.extend({}, this.state.recordCount);
    limits.posts = limits.posts + 5;

    this.setState({recordCount: limits });
    return this.state;
  },

  render() {
    // XXX workaround for first render comments not updating, need to look at mixin
    this.startMeteorSubscriptions();
    return <FeedList incrementLimit={this.incrementLimit} postItems={this.state.postItems} {...this.props} />;
  }
});

