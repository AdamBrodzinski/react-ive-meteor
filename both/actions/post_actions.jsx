/*global PostActions:true, PostStore */

PostActions = {
  createPost(data) {
    PostStore.handleCreatePost(data);
  }
};

