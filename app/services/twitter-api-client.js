/* globals twttr */

var twitterScriptPromise;

export default Ember.Object.extend({
  tracking: null, // optional injection
  load: function() {
    var self = this;
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
          Ember.run(function(){
            self.twttr = twttr;
            self.subscribeToTweetEvent();
            resolve(twttr);
          });
        });
      });
    }
    return twitterScriptPromise;
  },

  subscribeToTweetEvent: function() {
    var tracking = this.tracking;
    if(!tracking) { return; }
    this._onTweet = function(ev) {
      if(tracking.tweet) { tracking.tweet(ev); }
    }
    this.twttr.events.bind('tweet', this._onTweet);
  },

  unsubscribeFromTweetEvents: function() {
    if(this._onTweet) {
      this.twttr.events.unbind('tweet', this._onTweet);
    }
  },

  willDestroy: function() {
    this._super();
    this.unsubscribeFromTweetEvents();
  }
});