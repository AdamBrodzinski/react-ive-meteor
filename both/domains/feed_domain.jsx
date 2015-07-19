/*global FeedDomain:true, Comments, Posts, FlowRouter */

FeedDomain = {
  // these are pulling from the Minimongo cache, only the subscription can
  // fetch data from the server

  getAllFeedPosts() {
    return Posts.find({}, {sort: {createdAt: -1}}).fetch();
  },

  getPostCommentIds() {
    return Posts.find({}, {fields: {_id: 1}}).map(doc => doc._id);
  },

  getCommentsFromPostId(docId) {
    return Comments.find({postId: docId}, {sort: {createdAt: -1}}).fetch();
  },

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
