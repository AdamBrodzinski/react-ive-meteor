/*global ErrorActions:true */

ErrorActions = {
  needLogin() {
    // TODO make an isomorphic/universal error handler
    if (Meteor.isClient) {
      alert("You must be logged in to do that");
    }
  },
};

