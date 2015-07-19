/*global PostActions:true, PostsDomain */

PostActions = {
  createPost(data) {
    PostsDomain.handleCreatePost(data);
  },

  deletePost(docId) {
    PostsDomain.handleDeletePost(docId);
  },

  likePost(docId) {
    PostsDomain.handleLikePost(docId);
  }
};

