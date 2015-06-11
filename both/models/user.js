// User 'model' namespace
// allows your code to read a bit nicer with a
// few convenience methods and abstracts away the db
// in case we ever switch dbs in the future

/*global User:true */

User = {
  // returns user {Object} of current user or
  // returns empty object if not logged in to prevent
  // undefined if chaining helper methods
  current: function() {
    return (Meteor.user()) ? Meteor.user() : {};
  },

  // returns the user's id {String}
  id: function() {
    return Meteor.userId();
  },

  // returns user profile {Object}
  username: function() {
    return Meteor.user() && Meteor.user().username;
  },

  // returns first role {String} in user's role array if found
  role: function() {
    var user = Meteor.user();
    if (user && user.roles) {
      return user.roles[0];
    }
  },

  // returns user email {String}
  email: function() {
    var user = Meteor.users.findOne(this.id());
    if (user && user.emails && user.emails[0]) {
      return user.emails[0].address;
    }
  },

  // returns {Bool}
  loggedIn: function() {
    return !!Meteor.userId();
  },

  // returns {Bool}
  loggedOut: function() {
    return !this.loggedIn();
  },

  // returns {Bool}
  loggingIn: function() {
    return Meteor.loggingIn();
  },

  // returns {Bool}
  notLoggingIn: function() {
    return !Meteor.loggingIn();
  }

  // CRUD

  // Create handles with Meteor login buttons
};

