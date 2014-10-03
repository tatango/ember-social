import Ember from 'ember';

/* globals FB */

export default Ember.Component.extend({
  socialApiClient: null, //injected

  url: null, // Defaults to specified Facebook app_id
  'fb-colorscheme': 'light', // Valid options: 'light' or 'dark'

  createFacebookFacepile: function() {
    var self = this;
    this.socialApiClient.load().then(function(FB) {
      if (self.state !== 'inDOM') { return; }
      var attrs = [];
      var url = self.get('url');
      if (url) {
        attrs.push('data-href="' + url + '"');
      }
      var fbColorScheme = self.get('fb-colorscheme');
      if (fbColorScheme) {
        attrs.push('data-colorscheme="' + fbColorScheme + '"')
      }
      self.$().html('<div class="fb-facepile" ' + attrs.join(' ') + '></div>');
      FB.XFBML.parse(self.get('element'));
    });
  }.on('didInsertElement')
});
