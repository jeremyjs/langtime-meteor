Sessions = new Mongo.Collection('sessions');
Cards = new Mongo.Collection('cards');

Meteor.methods({
  addCard: function(card) {
    if(card.userId !== Meteor.userId()) return false;
    else Cards.insert(card);
  },
  editCard: function(card, opt) {
    var _id;
    if(opt) {
      _id = card;
      card = opt;
    } else {
      _id = card._id;
    }
    var oldCard = Cards.findOne(_id);
    var card = merge(oldCard, card);
    Cards.update({ _id: _id }, card, callback);
  }
});

// Session
// {
//   _id:        String,
//   studentId:  String,
//   teacherId:  String,
//   startTime:  Date,
//   endTime:    Date
// }

// Card
// {
//   _id:            String,
//   userId:         String,
//   title:          String,
//   type:           ['word', 'phrase']
//   front:          String,
//   back:           String,
//   frontAudioUrl:  String,
//   backAudioUrl:   String,
//   imageUrl:       String,
//   priority:       String,
//   mastery:        String,
//   createdAt:      Date,
//   modifiedAt:     Date,
//   lastReviewedAt: Date
// }

// User
// {
//   _id:          String,
//   email:        String,
//   password:     String,
//   profile: {
//     name:       String,
//   }
//   isSubscribed: Boolean,
//   createdAt:    Date
// }
