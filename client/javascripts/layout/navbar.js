
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

function isStudent() {
  var profile = safeGetProp(Meteor.user(), 'profile');
  return profile && !(profile.isTeacher);
}

Template.navbar.helpers({
  username: function () {
    var profile = safeGetProp(Meteor.user(), 'profile');
    return safeGetProp(profile, 'name');
  },
  showLibrary: function () {
    return isStudent() && !currentRouteName('cardLibrary');
  },
  isStudent: function () {
    return isStudent();
  },
  loggedIn: function () {
    return Meteor.user();
  },
  currentPageName: function () {
    return currentRouteName().toProperName();
  }
});

Template.navbar.events({
  'click .card-library': warnAndNavigate({
    href: '/',
    action_text: 'go to the dashboard',
    confirm_text: 'To the Dashboard!'
  }),
  'click .phrases': warnAndNavigate({
    href: '/phrases',
    action_text: 'go to the phrase bank',
    confirm_text: 'To the Phrase Bank!'
  }),
  'click .logout': function() {
    Meteor.logout();
    Router.go('login');
  },
  'click .settings': function() {
    Router.go('settings');
  }
});
