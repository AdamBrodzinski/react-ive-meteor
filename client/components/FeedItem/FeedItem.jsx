/*global React */

this.FeedItem = React.createClass({
  mixins: [ReactMeteor.Mixin],

  //startMeteorSubscriptions: function() {
    //Meteor.subscribe("players");
  //},

  // set inital state with a reactive data source like
  // Session, Mini-Mongo, FlowRouter's API, etc...
  getMeteorState() {
    return {
      currentStep: FlowRouter.getQueryParam("step"),
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type"
    };
  },

  render() {
    console.log('[FeedItem] rendering');
    return (
      <div className='feed-item'>
        <FeedItemHeader />

        <div className='feed-item-desc'>
          {this.state.desc}
        </div>

        <FeedItemFooter />
      </div>
    );
  },

});


this.FeedItemHeader = React.createClass({
  fieldsNeeded: {
    name: 1,
    createdAt: 1
  },

  render() {
    return (
      <div className="feed-item__header">
        <div className="avatar" />

        <div className='foo'>
          <div className="name">{this.state.name}</div>
          <div className="date">{this.state.createdAt}</div>
        </div>
      </div>
    );
  },

  getInitialState: function() {
    return {
      name: "Tiesto",
      createdAt: "Tuesday 17th 2008"
    };
  },

});


this.FeedItemFooter = React.createClass({
  mixins: [ReactMeteor.Mixin],

  fieldsNeeded: {
    likeCount: 1,
    commentCount: 1,
    shareCount: 1
  },


  render() {
    return (
      <div className="feed-item__footer">
        <a href="#">Like</a>
        <a href="#">Comment</a>
        <a href="#">Share</a>
      </div>
    );
  },

  getInitialState: function() {
    return {
      name: "Tiesto",
      createdAt: "Tuesday 17th 2008"
    };
  }
});

