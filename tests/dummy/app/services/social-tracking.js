import Ember from 'ember';

export default Ember.Object.extend({

  shared: function(serviceName, payload) {
    console.log('shared', serviceName, payload);
  },

  clicked: function(serviceName, payload) {
    console.log('clicked', serviceName, payload);
  }

});
