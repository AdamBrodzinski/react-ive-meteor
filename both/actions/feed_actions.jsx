/*global FeedActions:true, FeedStore */

FeedActions = {
  incrementPostLimit(amount) {
    FeedStore.handleIncrementPostLimit(amount);
  }
};
