import Ember from 'ember';

/* globals FB */

var facebookScriptPromise;
function loadFacebook(facebookAppId) {

  if (!facebookScriptPromise) {
    facebookScriptPromise = new Ember.RSVP.Promise(function(resolve/*, reject*/) {
      if (Ember.$('#fb-root').length === 0) {
        Ember.$('body').append('<div id="fb-root"></div>');
      }
      window.fbAsyncInit = function() {
        FB.init({
          appId      : facebookAppId,
          xfbml      : true,
          version    : 'v2.1'
        });
        resolve(FB);
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
    });
  }
  return facebookScriptPromise;
}

export default Ember.Component.extend({

  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Facebook share button UI
  isCustomLink: Ember.computed.equal('tagName','a'),
  useFaceboookUi: Ember.computed.not('isCustomLink'),

  /*
   * This is required when using tagName="a" (why the difference, I couldn't tell you).
   * You can simply specify it in the handlebars when using this component, but this
   * component will also look for a global FACEBOOK_APP_ID or a meta tag of the form:
   *
   *   <meta property="fb:app_id" content="[FB_APP_ID]" />
   */
  facebookAppId: function(){
    return Ember.$("meta[property='fb:app_id']").attr('content') || window.FACEBOOK_APP_ID;
  }.property(),

  url: null, // Defaults to current url
  text: null, // Defaults to current page title
  "fb-layout": "icon_link", // Valid options: "box_count", "button_count", "button", "link", "icon_link", or "icon"
  createFacebookShareButton: function() {
    var self = this;
    loadFacebook(this.get('facebookAppId')).then(function(FB) {
      if (self.get('useFaceboookUi')) {
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
    if (this.get('useFaceboookUi')) { return; } // doesn't need a click handler
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
