import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: null, // injected

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

  loadTwitterClient: function() {
    var self = this;
    this.socialApiClient.load().then(function(twttr) {
      if (self._state !== 'inDOM') { return; }
      self.twttr = twttr;
      self.trigger('twitterLoaded');
    });
  }.on('didInsertElement'),

  createTwitterShareButton: function() {
    if (this.get('useWebIntent')) { return; }
    this.twttr.widgets.createShareButton(
      this.get('url'),
      this.get('element'),
      {
        count: this.get('count'),
        text: this.get('text')
      }).then(function (/*el*/) {
        Ember.Logger.debug('Twitter Share Button created.');
      }
    );
  }.on('twitterLoaded')

});
