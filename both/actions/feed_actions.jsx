/*global FeedActions:true, FeedDomain */

FeedActions = {
  incrementPostLimit(amount) {
    FeedDomain.handleIncrementPostLimit(amount);
  },

  incrementStepParam() {
    FeedDomain.handleIncrementStepParam();
  },

  createComment(data) {
    FeedDomain.handleCreateComment(data);
  }
};
