Meteor.methods({
  clearSession: function () {
    Sessions.remove({ studentId: Meteor.userId() });
  },

  setSessionWaiting: function () {
    Sessions.update({ studentId: Meteor.userId() }, { $set: { "waiting": true } });
  }
});