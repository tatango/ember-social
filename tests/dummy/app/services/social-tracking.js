import Ember from 'ember';

export default Ember.Object.extend({

  tweet: function(event) {
    console.log(event);
  },

  linkedinShare: function(sharedUrl) {
    console.log(sharedUrl);
  }

});