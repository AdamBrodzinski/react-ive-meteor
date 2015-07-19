if (Meteor.isClient) {
  // Set the URL state of major component
  // this is passed into child props
  //
  Template.Feed.onCreated(function() {
    // you could use a reactive dict if a namespaced
    // session isn't your cup of tea
  });

  // cleanup so we don't have stale state
  Template.Feed.onDestroyed(function() {
    //Session.set('tmpl:Feed:state', null);
  });

  Template.Feed.helpers({
    pageState: function() {
      return Session.get('tmpl:Feed:state');
    }
  });

}
