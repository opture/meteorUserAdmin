/* global Meteor, Accounts, Session, Template */
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.body.helpers({
    users: function () {
      return Meteor.users.find({});
    }
  });

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  Template.createUser.events({
    'click button': function(event){
      event.preventDefault();
      $emailField = $('input[name="email"]');
      $pwdField = $('input[name="password"]');
      $firstNameField = $('[name="firstname"]');
      $lastNameField = $('[name="lastname"]');
      console.log('Email field');
      console.log($emailField);
        Meteor.call("addUser", {
          email: $emailField.val(),
          password: $pwdField.val(),
          profile: {
            firstname: $firstNameField.val(),
            lastname: $lastNameField.val()
          }
        });
        return false;
    }
  });


Template.user.helpers({

  userEmail: function(){
    console.log(this);
    return this.profile.firstname + ' ' + this.profile.lastname ;
  }
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.users.remove({});
    if (Meteor.users.find().count() === 0) {
      Accounts.createUser({
                                email : 'ph@aspsele.nu',
                                password : 'greven12',
                                profile  : {
                                    //publicly visible fields like firstname goes here
                                    firstname: 'P-H',
                                    lastname: 'Westman'
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