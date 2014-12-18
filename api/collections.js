Sessions = new Mongo.Collection('sessions');
Cards = new Mongo.Collection('cards');

function handleError(msg) {
  return function(err) {
    if(err) {
      console.log(msg + ': ', err);
      throw new Meteor.Error(500, '500 Error: ' + msg, err);
    } else {
      return true;
    }
  };
};

function setProp(prop) {
  var modifier = {};
  return function(id, val) {
    modifier['$set'][prop] = val;
    modifier['$set']['modifiedAt'] = new Date();
    Cards.update({ _id: id }, modifier);
    return { msg: 'success' };
  }
}

Meteor.methods({
  addCard: function(card) {
    Cards.insert(card);
    return { msg: 'success' };
  },

  setFront: setProp('front'),
  setBack: setProp('back'),
  setImageUrl: setProp('imageUrl'),

  getCard: function(cardId) {
    var card = Cards.findOne(cardId);
    if(!card) {
      throw new Meteor.Error(404, 'Error 404: Not found');
      return {};
    } else {
      return card;
    }
  }

  // getCards: function(userId) {
  //   var cards =
  //   return cards || { msg: 'failure' };
  // }
});

// seed
// var cards = [
//   {
//     userId: '',
//     front: 'Soap',
//     back: 'Wash your mouth out.',
//     imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRStyayTOG08HpAwB9nTCy51lUmwyDObIMqb8t6gZf4AO7X4VI'
//   },
//   {
//     userId: '',
//     front: 'BB Gun',
//     back: 'You\'ll shoot your eye out!',
//     imageUrl: 'http://www.blogcdn.com/blog.moviefone.com/media/2010/12/a-christmas-story-movie-poster-1020255292.jpg'
//   }
// ];

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
