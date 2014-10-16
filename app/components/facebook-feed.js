import Ember from 'ember';

/* globals FB */

/*
 * Show a button that pops up the Facebook Feed (DEPRECATED) dialog.
 * DEPRECATED BUT STILL WORKS...USED ARE YOUR OWN RISK
 *
 * When used with a `tagName` of `a`, it supports click tracking by
 * delegating to the socialApiClient, which can be provided with a
 * tracking object. When using without specifying a tagName, click
 * tracking is not supported due to restrictions of the Facebook SDK.
 */
export default Ember.Component.extend({
  socialApiClient: null, // injected

  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Facebook share button UI
  isCustomLink: Ember.computed.equal('tagName','a'),
  useFacebookUi: Ember.computed.not('isCustomLink'),

  url: null, // Defaults to current url
  image: null, // Defaults to og meta information
  title: null, // Defaults to og meta information
  subtitle: null, // Defaults url
  description: null, // Defaults to og meta information
  "fb-layout": "icon_link", // Valid options: "box_count", "button_count", "button", "link", "icon_link", or "icon"

  createFacebookFeedButton: function() {
    var self = this;
    this.socialApiClient.load().then(function(FB) {
      self.FB = FB;
      if (self._state !== 'inDOM') { return; }
      if (self.get('useFacebookUi')) {
        var attrs = [];
        var url = self.get('url');
        if (url) {
          attrs.push('data-href="' + url + '"');
        }
        var fbLayout = self.get('fb-layout');
        if (fbLayout) {
          attrs.push('data-layout="' + fbLayout + '"');
        }
        self.$().html('<div class="fb-share-button" ' + attrs.join(' ') +'></div>');
        FB.XFBML.parse(self.get('element'));
      } else {
        self.$().attr('href', '#');
      }
    });
  }.on('didInsertElement'),

  showShareDialog: function(e){
    this.socialApiClient.clicked({
      url: this.get('url'),
      componentName: 'facebook-share'
    });
    if (this.get('useFacebookUi')) { return; } // doesn't need a click handler
    var self = this;
    function showDialog(FB) {
      FB.ui(
        {
          method: 'feed',
          link: self.get('url'),
          picture: self.get('image'),
          caption: self.get('subtitle') || self.get('url'),
          description: self.get('description'),
          name: self.get('title')
        },
        function(response) {
          if (response && !response.error_code) {
            Ember.Logger.debug('Posting completed.');
          } else {
            Ember.Logger.error('Error while posting.');
          }
        }
      );
    }
    if (this.FB) {
      showDialog(this.FB);
    } else {
      this.socialApiClient.load().then(function(FB) {
        showDialog(FB);
      });
    }
    e.preventDefault();
  }.on('click')
});
