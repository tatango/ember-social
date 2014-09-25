import Ember from 'ember';

/* globals FB */

export default Ember.Component.extend({
  loader: null, // injected

  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Facebook share button UI
  isCustomLink: Ember.computed.equal('tagName','a'),
  useFacebookUi: Ember.computed.not('isCustomLink'),

  url: null, // Defaults to current url
  text: null, // Defaults to current page title
  "fb-layout": "icon_link", // Valid options: "box_count", "button_count", "button", "link", "icon_link", or "icon"

  createFacebookShareButton: function() {
    var self = this;
    this.loader.load().then(function(FB) {
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
    if (this.get('useFacebookUi')) { return; } // doesn't need a click handler
    FB.ui(
      {
        method: 'share',
        href: this.get('url'),
      },
      function(response) {
        if (response && !response.error_code) {
          Ember.Logger.debug('Posting completed.');
        } else {
          Ember.Logger.error('Error while posting.');
        }
      }
    );
    e.preventDefault();
  }.on('click')
});
