/*global Mongo, Comment:true, Comments:true, Post, User */

// NOTE, doing meteor data/collections this way loses much of Meteor's
// 'magic' and makes more work for us but i'm totally ok trading convenience
// for flexibility and easier to reason with security rules. You can still
// use one liner insert/update methods if you opt into using allow/deny based
// security. Perhaps someone can submit a branch using this methodology too!
//
// also, becauses i'm lazy, I made a file generator to create the below for you!
// https://github.com/AdamBrodzinski/meteor-generate/tree/react


var schema = {
  createdAt: Date,
  ownerId: String,
  postId: String,
  desc: String,
  username: String,
};

Comments = new Mongo.Collection('postComments');

// increment comment count on new comment
Comments.after.insert(function (userId, doc) {
  Meteor.call('Post.increment', doc.postId, 'commentCount');
});


// ** Security README **
//
// all Comment crud MiniMongo methods are disabled on the client
// by not having allow/deny rules. This ensures more granular security & moves
// the security logic into the meteor method. all mutation has to happen with
// the Meteor methods. These methods are placed into the 'both' folder so that
// Meteor uses the methods as stubs on the client, retaining the latency
// compensation. if you need to hide the model logic, move the methods into the
// server directory. doing so will lose latency compensation, however a stub
// can be created on the client folder to re-enable latency compensation.

Meteor.methods({
  /**
   * Creates a Comment document
   * @method
   * @param {object} data - data to insert
   * @returns {string} of document id
   */
  "Comment.create": function(data) {
    var docId;
    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    data.ownerId = User.id();
    data.createdAt = new Date();

    // Schema check, throws if it doesn't match
    check(data, schema);

    docId = Comments.insert(data);

    console.log("[Comment.create]", docId);
    return docId;
  },


  /**
   * Updates a Comment document using $set
   * @method
   * @param {string} docId - The doc id to update
   * @param {object} data - data to update
   * @returns {number} of documents updated (0|1)
   */
  "Comment.update": function(docId, data) {
    var optional = Match.Optional;
    var count, selector;

    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");
    check(docId, String);
    data.updatedAt = new Date();
    check(data, schema); //throws if it doesn't match

    // if caller doesn't own doc, update will fail because fields won't match
    selector = {_id: docId, ownerId: User.id()};

    count = Comments.update(selector, {$set: data});

    console.log("[Comment.update]", count, docId);
    return count;
  },


  /**
   * Destroys a Comment
   * @method
   * @param {string} docId - The doc id to destroy
   * @returns {number} of documents destroyed (0|1)
   */
  "Comment.destroy": function(docId) {
    check(docId, String);

    if (User.loggedOut()) throw new Meteor.Error(401, "Login required");

    // if caller doesn't own doc, destroy will fail because fields won't match
    var count = Comments.remove({_id: docId, ownerId: User.id()});

    console.log("[Comment.destroy]", count);
    return count;
  }
});
