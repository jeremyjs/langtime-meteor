
function hideChildren(parent, child) {
  $p = $(parent).children(child).hide();
};

function hideActions(parent) { hideChildren(parent, '.action'); }

function warnAndNavigate(options) {
  function gotoNext() {
    window.location.href = options.href;
  };

  return function() {
    if(window.location.pathname === '/session') {
      swal({
        title: 'Are you sure?',
        text: 'Are you sure you want to end the session and ' + options.action_text + '?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: options.confirm_text,
        closeOnConfirm: true
      }, gotoNext);
    } else {
      gotoNext();
    }
  };
};

function safeGetProp (obj, prop) {
  return obj && obj[prop];
};

Template.navbar.helpers({
  username: function () {
    var profile = safeGetProp(Meteor.user(), 'profile');
    return profile && profile.name;
  },
  isStudent: function () {
    var profile = safeGetProp(Meteor.user(), 'profile');
    return profile && !(profile.isTeacher);
  },
  loggedIn: function () {
    return Meteor.user();
  }
});

Template.navbar.events({
  'click .dashboard': warnAndNavigate({
    href: '/dashboard',
    action_text: 'go to the dashboard',
    confirm_text: 'To the Dashboard!'
  }),
  'click .phrases': warnAndNavigate({
    href: '/phrases',
    action_text: 'go to the phrase bank',
    confirm_text: 'To the Phrase Bank!'
  }),
  'click button.logout': function() {
    Meteor.logout();
    window.location.href = '/users/login';
  }
});
