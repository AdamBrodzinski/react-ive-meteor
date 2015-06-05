/*global Posts */

Meteor.publish('posts', function(fields) {
  console.log('Publishing Posts', fields);
  fields = fields || {};

  return Posts.find({}, {fields: fields});
});

