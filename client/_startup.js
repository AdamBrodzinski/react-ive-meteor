Meteor.startup(function() {
  console.log("Client Ready");
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

