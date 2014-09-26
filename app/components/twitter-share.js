import Ember from 'ember';

/* globals twttr */

var twitterScriptPromise;
function loadTwitter() {

  if (!twitterScriptPromise) {
    twitterScriptPromise = new Ember.RSVP.Promise(function(resolve, reject) {
      window.twttr = (function (d, s, id) {
        var t, js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src= "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);
        return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
      }(document, "script", "twitter-wjs"));

      twttr.ready(function(twttr) {
        resolve(twttr);
      });
    });
  }
  return twitterScriptPromise;
}

export default Ember.Component.extend({

  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Twitter share button UI
  useWebIntent: Ember.computed.equal('tagName', 'a'),

  url: null, // Defaults to current url
  text: null, // Defaults to current page title
  count: 'none', // valid values: 'none', 'vertical', or 'horizontal'
                 // This option does nothing when tagName is 'a'

  attributeBindings: ['webIntentUrl:href'],
  webIntentUrl: function(){
    if (!this.get('useWebIntent')) { return; }

    var intentUrl = 'https://twitter.com/intent/tweet';
    var intentParams = [];

    var shareUrl = this.get('url');
    if (shareUrl) {
      intentParams.push('url=' + encodeURIComponent(shareUrl));
    }

    var shareText = this.get('text');
    if (shareText) {
      intentParams.push('text=' + encodeURIComponent(shareText));
    }

    return intentUrl + '?' + intentParams.join('&');
  }.property('useWebIntent', 'url', 'text'),

  createTwitterShareButton: function() {
    var self = this;
    loadTwitter().then(function(twttr) {
      if (this._state !== 'inDOM') { return; }
      if (!self.get('useWebIntent')) {
        twttr.widgets.createShareButton(
          self.get('url'),
          self.get('element'),
          {
            count: self.get('count'),
            text: self.get('text')
          }).then(function (/*el*/) {
            Ember.Logger.debug('Twitter Share Button created.');
          });
      }
    });
  }.on('didInsertElement')
});
