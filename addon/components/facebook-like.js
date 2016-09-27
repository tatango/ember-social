import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: Ember.inject.service('facebook-api-client'), // injected

  url: null, // Defaults to current url
  'fb-layout': 'standard', // Valid options: 'standard', 'button_count', 'button', or 'box_count'
  'fb-action': 'like', // Valid options: 'like' or 'recommend'
  'fb-show-faces': 'true',
  'fb-size': 'small', // Valid options: 'small' or 'large'
  'fb-share': 'true',
  'fb-width': null,

  createFacebookLikeButton: Ember.on('didInsertElement', function() {
    var self = this;
    this.get('socialApiClient').load().then(function(FB) {
      if (self._state !== 'inDOM') { return; }
      var attrs = [];
      var url = self.get('url');
      if (url) {
        attrs.push('data-href="' + url + '"');
      }
      var fbLayout = self.get('fb-layout');
      if (fbLayout) {
        attrs.push('data-layout="' + fbLayout + '"');
      }
      var fbAction = self.get('fb-action');
      if (fbAction) {
        attrs.push('data-action="' + fbAction + '"');
      }
      var fbWidth = self.get('fb-width');
      if (fbWidth) {
        attrs.push('data-width="' + fbWidth + '"');
      }
      var fbShowFaces = self.get('fb-show-faces');
      if (fbShowFaces) {
        attrs.push('data-show-faces="' + fbShowFaces + '"');
      }
      var fbSize = self.get('fb-size');
      if (fbSize) {
        attrs.push('data-size="' + fbSize + '"');
      }
      var fbShare = self.get('fb-share');
      if (fbShare) {
        attrs.push('data-share="' + fbShare + '"');
      }
      self.$().html('<div class="fb-like" ' + attrs.join(' ') +'></div>');
      FB.XFBML.parse(self.get('element'));
    });
  })

});