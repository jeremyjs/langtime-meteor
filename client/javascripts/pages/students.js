
Template.students.helpers({
  sessions: function () {
    return Sessions.find({ waiting: true });
  },

  rightDisabled: function () {
    if( !Session.get('sessionId') ) return 'disabled';
    else return '';
  }
});

Template.students.events({
  'click .continue': function () {
    Meteor.call('joinSession', Session.get('sessionId'));
    Router.go('session');
  }
});

Template.sessionRow.helpers({
  active: function () {
    if(this._id === Session.get('sessionId')) return 'active';
    else return '';
  },

  studentName: function () {
    var student = Meteor.users.find({ _id: this.studentId });
    var profile = safeGetProp(student, 'profile');
    return safeGetProp(profile, 'name');
  }
});

Template.sessionRow.events({
  'click .student': function () {
    Session.set('sessionId', this._id);
  }
});
