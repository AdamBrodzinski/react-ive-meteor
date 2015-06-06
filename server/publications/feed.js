/*global Posts, PostComments */

Meteor.publish('feed', function(fields) {
  console.log('Publishing Posts', fields);

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

  if (!fields.posts || !fields.postComments._id) {
    return this.ready();
  }

  // prevent passing in an empty field
  if (!fields.posts._id || !fields.postComments._id) {
    return this.ready();
  }

  // TODO whitelist/blacklist fields
  // XXX don't let empty object pass in for fields!

  // pass both Mongo cursors to publish function, both resources will show
  // up in clientside Mini-Mongo for querying
  return [
    Posts.find({}, {fields: fields.posts}),
    PostComments.find({}, {fields: fields.postComments})
  ];
});

