/*global PostActions:true, PostsDomain */

PostActions = {
  createPost(data) {
    // handle side effects here like analytics,
    // or gather data to pass to domain
    PostsDomain.handleCreatePost(data);
  },

  deletePost(docId) {
    PostsDomain.handleDeletePost(docId);
  },

  likePost(docId) {
    PostsDomain.handleLikePost(docId);
  }
};

