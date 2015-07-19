/*global FeedDomain:true, FlowRouter */

FeedDomain = {
  // this might go in a CommentsDomain but since we only have 1 method...
  handleCreateComment(data) {
    Meteor.call('Comment.create', data);
  },

  handleIncrementPostLimit(amount) {
    // TODO
    console.log('[FeedDomain.incrementPostLimit]', amount);
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
