/*global React */
this.FeedItem = React.createClass({
  mixins: [ReactMeteor.Mixin],

  // set inital state with a reactive data source like
  // Session, Mini-Mongo, FlowRouter's API, etc...
  getMeteorState() {
    return {
      currentStep: FlowRouter.getQueryParam("step")
    };
  },

  render() {
    console.log('[FeedItem] rendering');
    return (
      <div style={styles.container}>
        Step Number: {this.state.currentStep} <br/>
        Query: {this.props.sstep} <br/>
        Params: {this.props.params} <br/>
      </div>
    );
  },

  //startMeteorSubscriptions: function() {
    //Meteor.subscribe("players");
  //},
});

var styles = {
  backgroundColor: 'blue'
};
