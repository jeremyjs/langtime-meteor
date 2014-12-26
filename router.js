
Router.configure({
  onBeforeAction: function() {
    if(Meteor.user() || Meteor.loggingIn()) {
      if(this.name !== 'session') Meteor.call('clearSession');
      this.next();
    }
    else this.render('login');
  },
  layoutTemplate: 'layout'
});

Router.route('/', function () {
  if(Meteor.user() && Meteor.user().profile.isTeacher) {
    this.redirect('students');
  } else {
    this.redirect('cardLibrary');
  }
}, {
  name: 'root'
});

Router.route('/students');

Router.route('/cards', {
  name: 'cardLibrary',
  template: 'cardLibrary',
  data: function() {
    return Cards.find({ userId: Meteor.userId() });
  }
}, {
  name: 'cardLibrary'
});

Router.route('/login', { name: 'login' });

Router.route('/waiting', { name: 'waiting' });

Router.route('/session', function () {
  Meteor.call('setSessionWaiting');
  this.render('session');
}, { name: 'session' });

Router.route('/settings', {
  data: function() {
    var user = Meteor.user();
    return {
      name: user.profile.name,
      email: user.emails[0].address
    }
  }
});
