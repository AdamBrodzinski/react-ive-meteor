/*global Posts, PostComments */

Meteor.publish('feed', function(fields) {
  console.log('Publishing Posts', fields);

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

