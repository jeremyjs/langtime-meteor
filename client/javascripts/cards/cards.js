
Template.cards.helpers({
  data: function () {
    // TODO: add publication/subscription
    return Cards.find({ userId: Meteor.userId() });
  }
});
