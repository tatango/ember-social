import Service from '@ember/service';

export default Service.extend({
  twitterClickCount: 0,
  twitterShareCount: 0,
  linkedinClickCount: 0,
  linkedinShareCount: 0,
  facebookClickCount: 0,
  facebookShareCount: 0,
  emailClickCount: 0,

  shared: function(serviceName) {
    this.incrementProperty(serviceName + 'ShareCount');
  },

  clicked: function(serviceName) {
    this.incrementProperty(serviceName + 'ClickCount');
  }
});
