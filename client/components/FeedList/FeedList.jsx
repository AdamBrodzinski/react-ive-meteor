/*global Posts, FeedItem */
var PureRender = React.addons.PureRenderMixin;

this.FeedList = React.createClass({
  mixins: [ReactMeteor.Mixin, PureRender],

  componentWillMount() {
    this.startMeteorSubscriptions();
  },

  // subscribe to a reactive stream of data from
  // publication at:  server/publications/posts.js
  startMeteorSubscriptions() {
    console.log('[FeedList] subscribing to data');
    // TODO implement a relay/graphql type of system
    var fieldsNeeded = {
      desc: 1,
      likeCount: 1,
      commentCount: 1,
      userName: 1,
      createdAt: 1,
    };
    return Meteor.subscribe("posts", fieldsNeeded);
  },

  // fetch and merge Meteor 'reactive' data with this.state
  // if new data is sent down this will update to keep in sync
  getMeteorState: function() {
    return {
      postItems: Posts.find({}, {sort: {createdAt: -1}}).fetch() || []
    };
  },

  render() {
    console.log("[FeedList] Rendering");
    return (
      <div>
        {
          this.state.postItems.map(doc => {
            return <FeedItem key={doc._id} {...doc} />;
          })
        }
      </div>
    );
  }
});

