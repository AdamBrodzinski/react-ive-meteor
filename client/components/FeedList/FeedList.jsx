/*global FeedItem */

this.FeedList = React.createClass({
  mixins: [ReactMeteor.Mixin],

  componentWillMount() {
    this.startMeteorSubscriptions();
  },

  startMeteorSubscriptions() {
    console.log('sub')
    return Meteor.subscribe("posts", {desc: 1});
  },

  getMeteorState: function() {
    return db.posts.find().fetch() || [];
  },

  render() {
    console.log('rendering list');

    return (
      <div>
        {this.renderPostItems()}
      </div>
    );
  },

  renderPostItems() {
    return [<FeedItem key={0} {...this.state} />,
      <FeedItem key={1} {...this.state} />,
      <FeedItem key={2} {...this.state} />,
      <FeedItem key={3} {...this.state} />,
    ]
  },

});

