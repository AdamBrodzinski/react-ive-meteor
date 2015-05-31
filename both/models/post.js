/*global Post:true, User */

db.posts = new Mongo.Collection('posts');

// run hook to log or denormalize mongo data
db.posts.after.insert(function (userId, doc) {
  console.log("Inserted Doc", userId, doc);
});


// CRUD facade to call Meteor methods more elegantly
Post = {
  create: function(data, callback) {
    return Meteor.call('Post.create', data, callback);
  },

  update: function(docId, data, callback) {
    return Meteor.call('Post.update', docId, data, callback);
  },

  destroy: function(docId, callback) {
    return Meteor.call('Post.destroy', docId, callback);
  }
};


// ** Security README **
//
// all insert, update, and delete MiniMongo methods are disabled on the client
// by not having allow/deny rules. This ensures more granular security & moves
// the security logic into the meteor method. all mutation has to happen with
// the Meteor methods. These methods are placed into the 'both' folder so that
// Meteor uses the methods as stubs on the client, retaining the latency
// compensation. if you need to hide the model, move the method into the
// server directory. doing so will lose latency compensation, however a stub
// can be created on the client folder to re-enable latency compensation.
//
// Methods assume you have accounts and require the caller to be logged in for
// security. If this is not needed, remove the loggedIn check AND the ownerId
// assignment so the ownerId is not null on create.


Meteor.methods({
  /**
   * Creates a Post document
   * @method
   * @param {object} data - data to insert
   * @returns {string} of document id
   */
  "Post.create": function(data) {
    var docId;
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    data.ownerId = User.id();
    data.createdAt = new Date();

    // TODO plug in your own schema
    check(data, {
      createdAt: Date,
      ownerId: String,
      // XXX temp fields
      foo: String,
      bar: String
    });

    docId = db.posts.insert(data);

    console.log("  [Post.create]", docId);
    return docId;
  },


  /**
   * Updates a Post document using $set
   * @method
   * @param {string} docId - The doc id to update
   * @param {object} data - data to update
   * @returns {number} of documents updated (0|1)
   */
  "Post.update": function(docId, data) {
    var optional = Match.Optional;
    var count, selector;

    check(docId, String);
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");
    data.updatedAt = new Date();

    // TODO plug in your own schema
    check(data, {
      createdAt: Date,
      updatedAt: Date,
      ownerId: String,
      // XXX temp fields
      foo: optional(String),
      bar: String
    });

    // if caller doesn't own doc, update will fail because fields won't match
    selector = {_id: docId, ownerId: User.id()};

    count = db.posts.update(selector, {$set: data});

    console.log("  [Post.update]", count, docId);
    return count;
  },


  /**
   * Destroys a Post
   * @method
   * @param {string} docId - The doc id to destroy
   * @returns {number} of documents destroyed (0|1)
   */
  "Post.destroy": function(docId) {
    var count;
    check(docId, String);

    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    // if caller doesn't own doc, destroy will fail because fields won't match
    count = db.posts.remove({_id: docId, ownerId: User.id()});

    console.log("  [Post.destroy]", count);
    return count;
  }
});

