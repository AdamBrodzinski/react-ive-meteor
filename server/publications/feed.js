/*global Posts, PostComments */

var optional = Match.Optional;

Meteor.publish('feed', function(fields, limits) {
  console.log('Publishing Posts', fields);
  console.log("LImit:", limits);

  // SECURITY NOTE
  // if this was data that could not be shown to a specific set of
  // users or a logged out user, you would check here to verify they're
  // allowed to receive the data.
  // **TRUST NOTHING FROM THE CLIENT** instead ask the server what they're
  // user ID is and check their permissions to see if the role is met, never
  // never pass in the user ID from the client as they could guess an admin
  // ID and gain access.
  //
  //  if (!this.userId)
  //       throw new Meteor.Error(401, "Access denied, please login");
  //        or
  //  if (Roles.userIsInRole(this.userId, 'admin'))
  //       throw new Meteor.Error(403, "Not authorized to view this data");
  // -----------------------------------------------------------------------


  // ensure *only* the fields we whitelist are passed in unless wrapped in
  // Match.Optional it will be required. If any key does not match the
  // publication will fail and throw an error
  check(fields, {
    posts: {
      _id: Boolean,  // id required for security
      desc: optional(Boolean),
      likeCount: optional(Boolean),
      commentCount: optional(Boolean),
      userName: optional(Boolean),
      createdAt: optional(Boolean),
      ownerId: optional(Boolean),
    },

    postComments: {
      _id: Boolean,  // id required for security
      createdAt: optional(Boolean),
      username: optional(Boolean),
      desc: optional(Boolean),
      postId: optional(Boolean),
    }
  });

  var sort = {createdAt: -1};

  // pass both Mongo cursors to publish function, both resources will show
  // up in clientside Mini-Mongo for querying
  return [
    Posts.find({}, {fields: fields.posts, sort: sort, limit: limits.posts }),
    PostComments.find({}, {fields: fields.postComments})
  ];
});

