/*global Post:true, Posts:true, User */

// NOTE, doing meteor data/collections this way loses much of Meteor's
// 'magic' and makes more work for us but i'm totally ok trading convenience
// for flexibility and easier to reason with security rules. You can still
// use one liner insert/update methods if you opt into using allow/deny based
// security. Perhaps someone can submit a branch using this methodology too!
//
// also, becauses i'm lazy, I made a file generator to create the below for you!

Posts = new Mongo.Collection('posts', {transform: function(doc) {
  // make documents inherit our model, no IE8 support with __proto__
  doc.__proto__ = Post;
  return doc;
}});

// optionally run hook to log, audit, or denormalize mongo data
Posts.after.insert(function (userId, doc) {
  console.log("Inserted Doc", userId, doc);
});


// Post Model: add methods to here and your fetched data will have them for use
//
// CRUD facade allows you to call Meteor DDP methods more elegantly.
//
// If you don't have the model instance on the client, you can pass in the
// id as the first param and it will use that instead, security checks
// will ensure that user is allowed to mutate document.
//
// Running these Meteor.call's on the client will *only* run a simulation
// and the server copy does the realy data mutating. This prevents users
// from tampering data. Trust *nothing* on the client!
//
// Ex:
//    var post = Posts.findOne({_id: '123'});
//    post.fullName();
//    post.like();
//    post.update({desc: 'Hello'});
//
//    Post.update('123', {desc: 'Goodbye'});
//
Post = {
  create: function(data, callback) {
    return Meteor.call('Post.create', data, callback);
  },

  update: function(data, callback) {
    return Meteor.call('Post.update', this._id, data, callback);
  },

  destroy: function(callback) {
    return Meteor.call('Post.destroy', this._id, callback);
  },

  like: function(docId, callback) {
    return Meteor.call('Post.like', docId, callback);
  },

  // example method (not used in app)
  fullName: function() {
    return this.firstName + this.lastName;
  }
};


// ** Security README **
//
// all Post insert, update & delete MiniMongo methods are disabled on the client
// by not having allow/deny rules. This ensures more granular security & moves
// the security logic into the meteor method. all mutation has to happen with
// the Meteor methods. These methods are placed into the 'both' folder so that
// Meteor uses the methods as stubs on the client, retaining the latency
// compensation. if you need to hide the model logic, move the methods into the
// server directory. doing so will lose latency compensation, however a stub
// can be created on the client folder to re-enable latency compensation.
//
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
    data.likeCount = 0;
    data.commentCount = 0;

    // TODO plug in your own schema
    //check(data, {
      //createdAt: Date,
      //ownerId: String,
      //// XXX temp fields
      //foo: String,
      //bar: String
    //});

    docId = Posts.insert(data);

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

    count = Posts.update(selector, {$set: data});

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
    check(docId, String);

    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    // if caller doesn't own doc, destroy will fail because fields won't match
    var count = Posts.remove({_id: docId, ownerId: User.id()});

    console.log("  [Post.destroy]", count);
    return count;
  },


  /**
   * Naive implementation of increment like count by 1
   * this will not check for multiple like by the same person or
   * even track who liked it. Perhaps after releasing we can fix this
   *
   * @method
   * @param {string} docId - The doc id to like
   * @returns {number} of documents updated (0|1)
   */
  "Post.like": function(docId) {
    check(docId, String);
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    var count = Posts.update({_id: docId}, {$inc: {likeCount: 1} });

    console.log("  [Post.like]", count);
    return count;
  },
});

