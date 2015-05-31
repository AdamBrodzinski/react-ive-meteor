Meteor.publish('posts', function(fields) {
  console.log('Publishing Posts', fields);
  fields = fields || {};

  return db.posts.find({}, {fields: fields});
});

