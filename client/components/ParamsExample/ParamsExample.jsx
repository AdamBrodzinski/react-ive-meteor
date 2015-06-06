/*global FlowRouter */

this.ParamsExample = React.createClass({
  mixins: [ReactMeteor.Mixin],

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

        {/*  https://github.com/meteorhacks/flow-router#api  */}
        <b>Step:</b> { FlowRouter.getQueryParam('step') }

        <br /><br />

        <button onClick={ this.incStep }>
          Press to Increment Step Query Params
        </button>
      </div>
    );
  },

  incStep() {
    var currentStep = FlowRouter.getQueryParam('step') || 0;
    var nextStep = parseInt(currentStep) + 1;
    FlowRouter.setQueryParams({ step: nextStep });
  }

});

