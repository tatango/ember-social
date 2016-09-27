import Ember from 'ember';

export default Ember.Service.extend({
  twitterClickCount: 0,
  twitterShareCount: 0,
  linkedinClickCount: 0,
  linkedinShareCount: 0,
  facebookClickCount: 0,
  facebookShareCount: 0,
  emailClickCount: 0,

  shared: function(serviceName, payload) {
    console.log('shared', serviceName, payload);
    this.incrementProperty(serviceName + 'ShareCount');
  },

  clicked: function(serviceName, payload) {
    console.log('clicked', serviceName, payload);
    this.incrementProperty(serviceName + 'ClickCount');
  }
});
