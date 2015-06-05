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

        <b>Step:</b> { FlowRouter.getQueryParam('step') }

        <br /><br />

        <button onClick={ this.incStep }>
          Inc. Step
        </button>
      </div>
    );
  },

  incStep() {
    var currentStep = FlowRouter.getQueryParam('step') || 0;
    var nextStep = parseInt(currentStep) + 1;
    FlowRouter.go('/feed?step=' + nextStep);
  }

});

