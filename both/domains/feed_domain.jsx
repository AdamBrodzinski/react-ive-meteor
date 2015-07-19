/*global FeedDomain:true, FlowRouter */

FeedDomain = {
  handleCreateComment(data) {
    PostComment.create(data);
  },

  handleIncrementPostLimit(amount) {
    console.log('[FeedDomain.incrementPostLimit]', amount);
    // TODO
  },

  // should params go in a RouteStore or ParamStore? perhaps overkill

  handleIncrementStepParam() {
    var currentStep = FlowRouter.getQueryParam('step') || 0;
    var nextStep = parseInt(currentStep) + 1;
    FlowRouter.setQueryParams({ step: nextStep });
  },

  getStepParam() {
    // see full API - https://github.com/meteorhacks/flow-router#api
    return FlowRouter.getQueryParam('step');
  }
};
