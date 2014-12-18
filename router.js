
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
  if(Meteor.user().profile.isTeacher) {
    this.render('students');
  } else {
    this.render('dashboard');
  }
}, { name: 'root' });

Router.route('/login', { name: 'login' });

Router.route('/waiting', { name: 'waiting' });

Router.route('/session', function () {
  Meteor.call('setSessionWaiting');
  this.render('session');
}, { name: 'session' });
