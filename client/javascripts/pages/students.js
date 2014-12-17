
Template.students.helpers({
  students: function () {
    return Meteor.users.find({
      profile: { isTeacher: { $ne: true } },
      session: { $exists: true }
    });
  }
});

$(function() {
  setHandlers();
  onAuth(function success() {
    $('.continue').click(function() {
      var teacherId = window.currentUser.uid;
      var studentId = $('.student.selected').attr('id');
      fb.users.child(teacherId).child('currentStudent').set(studentId, function() {
        window.location.href = '/session';
      });
    });
  }, function failure() {
    // no action
  });
});

var setHandlers = function() {
  $('.student').click(function() {
    $('.student').removeClass('selected');
    $(this).addClass('selected');
    $('.continue').prop('disabled', false);
  });
};
