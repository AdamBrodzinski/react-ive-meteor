/*global FlowRouter, FeedStore */

this.ParamsExample = React.createClass({
  render() {
    return (
      <div className='params-example'>
        <h4>
          Reactive Query Params
        </h4>
        <p>
          FlowRouter provides a reactive API that will
          allows for automatic render updates when the
          data changes
        </p>

        <b>Step:</b> { FeedStore.getStepParam() }

        <br /><br />

        <button onClick={ FeedActions.incrementStepParam }>
          Press to Increment Step Query Params
        </button>
      </div>
    );
  }
});

