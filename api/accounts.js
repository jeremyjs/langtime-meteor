Meteor.methods({
  clearSession: function () {
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { "session": false } });
  },

  setSessionWaiting: function () {
    Meteor.users.update({ _id: Meteor.userId() }, { $set: { "session": { "waiting": true } } });
  }
});