
var timeIn, timeOut, delay = 300;

function showPreview(e) {
  if(e) e.preventDefault();
  $(this).children('video').animate({marginLeft: '0'} , delay);
};

function hidePreview(e) {
  if(e) e.preventDefault();
  var $video = $(this).children('video');
  var width = $video.width();
  $video.animate({marginLeft: '-'+width+'px'} , delay);
};

Template.video.events({
  'mouseenter .video-container.local': function(e) {
    if (timeOut) clearTimeout(timeOut);
    var that = this;
    timeIn = setTimeout(function() {
      showPreview.call(that, e);
    }, delay);
  },

  'mouseleave .video-container.local': function(e) {
    if (timeIn) clearTimeout(timeIn);
    var that = this;
    timeOut = setTimeout(function() {
      hidePreview.call(that, e);
    }, delay);
  }
});

Template.video.rendered = function () {

  var webrtc = new SimpleWebRTC({
    localVideoEl: 'localVideo',
    remoteVideosEl: 'remoteVideo',
    autoRequestMedia: true
  }, function() {
    $(this).hide();
  });

  // window.test = webrtc;
  // var uid = Meteor.user()._id;
  // webrtc.on('readyToCall', function () {
  //   webrtc.joinRoom('me.langti.www.' + uid);
  //   setTimeout(function() {
  //     hidePreview.call($('.video-container.local'));
  //   }, 3000);
  // });

};