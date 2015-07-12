/*global PostActions:true, PostStore */

PostActions = {
  createPost(data) {
    PostStore.handleCreatePost(data);
  },

  likePost(docId) {
    PostStore.handleLikePost(docId);
  }
};

