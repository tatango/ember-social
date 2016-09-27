import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: Ember.inject.service('twitter-api-client'), // injected

  "tweet-id": null, // required - id of the tweet that you want to embed
  cards: "hidden", // When set to hidden, links in a Tweet are not expanded to photo, video, or link previews.
  conversation: null, // When set to none, only the cited Tweet will be displayed even if it is in reply to another Tweet.
  lang: null, // A supported Twitter language code. https://dev.twitter.com/overview/general/adding-international-support-to-your-apps,
  dnt: null, // When set to true, the Tweet and its embedded page do not influence Twitter targeting including suggested accounts. https://support.twitter.com/articles/20169421,
  theme: null, // When set to dark, displays Tweet with light text over a dark background.
  "link-color": null, // Adjust the color of Tweet links with a hexadecimal color value.
  width: null, // The maximum width of the rendered Tweet in whole pixels. This value should be between 250 and 550 pixels.
  align: null, // Float the Tweet left, right, or center relative to its container.

  loadTwitterClient: Ember.on('didInsertElement', function() {
    var self = this;
    this.get('socialApiClient').load().then(function(twttr) {
      if (self._state !== 'inDOM') { return; }
      self.twttr = twttr;
      self.trigger('twitterLoaded');
    });
  }),

  createTwitterCard: Ember.on('twitterLoaded', function() {
    var tweetId = this.get('tweet-id');
    if (tweetId) {
      this.twttr.widgets.createTweet(tweetId, this.get('element'), {
        cards: this.get('cards'),
        conversation: this.get('conversation'),
        lang: this.get('lang'),
        dnt: this.get('dnt'),
        theme: this.get('theme'),
        linkColor: this.get('link-color'),
        width: this.get('width'),
        align: this.get('align')
      }).then(function (/*el*/) {
        Ember.Logger.debug('Twitter Embedded Tweet inserted.');
      });
    }
  })
});
