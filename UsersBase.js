/* global Meteor, Accounts, Session, Template */
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    users: function () {
      return Meteor.users.find({});
    }
  });
  Template.createUser.helpers({
    users: function () {
      return Meteor.users.find({});
    }
  });
  Template.createUser.events({
    'click button': function(event){
      event.preventDefault();
      var $emailField = $('input[name="email"]'),
        $pwdField = $('input[name="password"]'),
        $firstNameField = $('[name="firstname"]'),
        $lastNameField = $('[name="lastname"]'),
        userManager = $('[name="userManager"]').val();
      console.log('Email field');
      console.log($emailField);
      Meteor.call("addUser", {
          email: $emailField.val(),
          password: $pwdField.val(),
          profile: {
            firstname: $firstNameField.val(),
            lastname: $lastNameField.val(),
            userManager: userManager
          }
      });
      $emailField.val('');
      $pwdField.val('');
      $firstNameField.val('');
      $lastNameField.val('');
      return false;
    }
  });


Template.user.helpers({

  userEmail: function(){
    console.log(this);
    return this.profile.firstname + ' ' + this.profile.lastname ;
  },
  userManager: function(){
    return Meteor.users.findOne({_id: this.profile.userManager}).profile.firstname;
  }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.users.remove({});
    if (Meteor.users.find().count() === 0) {
      Accounts.createUser({
                                email : 'foo@noemaildomain.cog',
                                password : 'password',
                                profile  : {
                                    firstname: 'John',
                                    lastname: 'Doe'
                                }

        });
      }
  });
}



Meteor.methods({
  addUser: function (user){
            Accounts.createUser(user);
  }
});

Accounts.config({
  forbidClientAccountCreation : true
});