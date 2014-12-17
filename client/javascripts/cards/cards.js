
Template.cards.helpers({
  data: function () {
    // TODO: replace with publication/subscription
    // return Cards.find(Meteor.userId());
    return [
      {
        title: 'Soap',
        phrases: ['Wash your mouth out.'],
        imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRStyayTOG08HpAwB9nTCy51lUmwyDObIMqb8t6gZf4AO7X4VI'
      },
      {
        title: 'BB Gun',
        phrases: ['You\'ll shoot your eye out!'],
        imageUrl: 'http://www.blogcdn.com/blog.moviefone.com/media/2010/12/a-christmas-story-movie-poster-1020255292.jpg'
      }
    ];
  }
});
