
function addOverlay(e) {
  e.preventDefault();
  var $card = $(e.target).parents('.card');
  $card.find('.overlay').show();
};

function removeOverlay(e) {
  e.preventDefault();
  $(e.target).parent().find('.overlay').hide();
};

Template.card.events({
  'mouseenter .inner': addOverlay,
  'mouseleave .inner': removeOverlay
});