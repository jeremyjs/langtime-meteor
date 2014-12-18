
Template.addCard.events({
  'click #add-card-btn': function () {
    Meteor.call('addCard', {
      userId: Meteor.userId(),
      front: $('input.front').val(),
      back: $('input.back').val(),
      imageUrl: $('input.imageUrl').val(),
      createdAt: new Date()
    }, function (res) {
      console.log(res);
    });
    $('.form-control').val('');
  }
});