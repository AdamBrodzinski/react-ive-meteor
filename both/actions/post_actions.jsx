/*global PostActions:true, PostStore */

PostActions = {
  createPost(data) {
    PostStore.handleCreatePost(data);
  },

  deletePost(docId) {
    PostStore.handleDeletePost(docId);
  },

  likePost(docId) {
    PostStore.handleLikePost(docId);
  }
};

