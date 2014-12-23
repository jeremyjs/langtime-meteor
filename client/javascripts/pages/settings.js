Template.settings.events({
  'submit .settings-form': function (e) {
    e.preventDefault();
    var old_password = $('input.old-password');
    var new_password = $('input.new-password');
    var confirmation = $('input.new-password-confirm');
    var email = $('input.new-email').val();
    var name = $('input.new-name').val();

    if(new_password !== confirmation) {
      $('.notice').html('The new password must be the same as the confirmation.')
      return;
    } else if(new_password) {
      Accounts.changePassword(old_password, new_password, function (err) {
        $('.notice').html(err);
      });
    }

    var user = Meteor.user();

    if(email) {
      user.emails[0].address = email;
      user.emails[0].verified = false;
    }

    if(name) user.profile.name = name;

    if(email || name) {
      Meteor.users.update({ _id: Meteor.userId() }, user, function (err) {
        $('.notice').html(err);
      });
    }
  }
});