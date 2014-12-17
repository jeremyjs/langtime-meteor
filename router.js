
Router.configure({
  onBeforeAction: function() {
    if(Meteor.user() || Meteor.loggingIn()) this.next();
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
});

Router.route('/waiting');

Router.route('/session');