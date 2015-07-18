/*global FeedStore:true, FlowRouter */

FeedStore = {
  handleCreateComment(data) {
    PostComment.create(data);
  },

  handleIncrementPostLimit(amount) {
    console.log('[FeedStore.incrementPostLimit]', amount);
    // TODO
  },

  // should params go in a RouteStore or ParamStore? perhaps overkill

  handleIncrementStepParam() {
    console.log('[FeedStore.handleIncrementStepParam]');
    var currentStep = FlowRouter.getQueryParam('step') || 0;
    var nextStep = parseInt(currentStep) + 1;
    FlowRouter.setQueryParams({ step: nextStep });
  },

  getStepParam() {
    // see full API - https://github.com/meteorhacks/flow-router#api
    return FlowRouter.getQueryParam('step');
  }
};

