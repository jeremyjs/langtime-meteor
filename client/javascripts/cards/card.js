
function warnAndDelete(e) {
  e.preventDefault();
  $card = $(this).parents('.card');
  setup($card);
  var cardId = $card.attr('id');
  swal({
    title: "Are you sure?",
    text: "Are you sure you want to delete this card?",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Delete, please!",
    closeOnConfirm: true
  }, function() {
    fb.users.child(window.currentUser.uid).child('cards').child(cardId).remove();
    $card.remove();
  });
};

function addOverlay(e) {
  e.preventDefault();
  var $card = $(e.target).parents('.card');
  $card.find('.overlay').show();
};

function removeOverlay(e) {
  e.preventDefault();
  $(e.target).parent().find('.overlay').hide();
};

Template.card.helpers({
  editing: function(section) {
    return Session.get('card-' + this._id + '-' + section);
  }
});

Template.card.events({
  'mouseenter .inner': addOverlay,
  'mouseleave .inner': removeOverlay,
  'click .editable': function(e) {
    e.preventDefault();
    console.log('e.target: ', e.target);
    // closest because target is sometimes the <i> tag
    var field = $(e.target).closest('.editable').data('field');
    Session.set('card-' + this._id + '-' + field, true);
    console.log('card-' + this._id + '-' + field, ': ',
      Session.get('card-' + this._id + '-' + field));
  },
  'submit .form-front': function(e) {
    e.preventDefault();
    var card = this.card;
    var front = $(e.target).parent().find('.input-front').val();
    Session.set('card-' + card._id + '-front', false);
    Cards.update({ _id: card._id }, { $set: { front: front } });
  },
  'submit .form-back': function(e) {
    e.preventDefault();
    var card = this.card;
    var phrases = $(e.target).parent().find('.input-back').val().split(',');
    Session.set('card-' + card._id + '-back', false);
    Cards.update({ _id: card._id }, { $set: { back: phrases } });
  },
  'submit .form-image': function(e) {
    e.preventDefault();
    console.log('this: ', this)
    var card = this;
    var url = $(e.target).parent().find('.input-image').val();
    Session.set('card-' + card._id + '-image', false);
    Cards.update({ _id: card._id }, { $set: { imageUrl: url } });
  }
});
