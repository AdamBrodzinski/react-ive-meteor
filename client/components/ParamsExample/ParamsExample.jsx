/*global FeedDomain, FeedActions */
/* jshint maxlen: false */

this.ParamsExample = React.createClass({
  handleClick() {
    FeedActions.incrementStepParam();
  },

  render() {
    var stepNumber = FeedDomain.getStepParam();
    return (
      <div className='params-example'>
        <h4>Reactive Query Params</h4>

        <p>
          FlowRouter provides a reactive API that will
          allows for automatic render updates when the
          data changes
        </p>

        <b>Step:</b> { stepNumber } <br/><br/>

        <button onClick={ this.handleClick }>
          Press to Increment Step Query Params
        </button>
      </div>
    );
  }
});
