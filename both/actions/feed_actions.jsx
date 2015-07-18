/*global FeedActions:true, FeedStore */

FeedActions = {
  incrementPostLimit(amount) {
    FeedStore.handleIncrementPostLimit(amount);
  },

  incrementStepParam() {
    FeedStore.handleIncrementStepParam();
  },

  createComment(data) {
    FeedStore.handleCreateComment(data);
  }
};
