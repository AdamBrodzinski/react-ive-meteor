/*global PostStore:true, User, Post */

PostStore = {
  handleCreatePost(data) {
    if (User.loggedOut()) {
      return alert("You must be logged in to post!");
    }

    Post.create({
      desc: data.desc,
      userName: User.username()
    });
    console.log('[PostStore.handleCreatePost]', data);
  }
};

