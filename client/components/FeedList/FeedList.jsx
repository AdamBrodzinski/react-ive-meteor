/*global FeedItem */

this.FeedList = React.createClass({
  mixins: [ReactMeteor.Mixin],

  componentWillMount() {
    this.startMeteorSubscriptions();
  },

  // subscribe to a reactive stream of data from
  // server/publications/posts.js  publish
  // TODO implement a relay/graphql type of system
  startMeteorSubscriptions() {
    console.log('[FeedList] subscribing to data');
    return Meteor.subscribe("posts");
  },

  // fetch and merge Meteor 'reactive' data with this.state
  // if new data is sent down this will update to keep in sync
  getMeteorState: function() {
    return db.posts.find().fetch() || [];
  },

  render() {
    console.log("[FeedList] Rendering");
    return (<div>{this.getPostItems()}</div>);
  },

  getPostItems() {
    console.log('state', this.state[0])
    return [
      <FeedItem key={0} {...this.state[0]} />,
      <FeedItem key={1} {...this.state[0]} />,
      <FeedItem key={2} {...this.state} />,
      <FeedItem key={3} {...this.state} />,
    ];
  },

});

