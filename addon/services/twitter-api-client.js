/* globals twttr */

import Ember from 'ember';

var twitterScriptPromise;

export default Ember.Object.extend({
  /*
   * A tracking object implementing `shared(serviceName, payload)` and/or
   * `clicked(serviceName, payload)` can be set on this object, and will
   * be delegated to if present.
   */
  tracking: null, // optional injection
  load: function() {
    var self = this;
    if (!twitterScriptPromise) {
      twitterScriptPromise = new Ember.RSVP.Promise(function(resolve /* , reject */) {
        window.twttr = (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
          if (d.getElementById(id)) { return window.twttr; }
          js = d.createElement(s);
          js.id = id;
          js.src = "https://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js, fjs);

          t._e = [];
          t.ready = function(f) {
            t._e.push(f);
          };

          return t;
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
      if(tracking.shared) { tracking.shared('twitter', ev); }
    };
    this._onClick = function(ev) {
      if(tracking.clicked) { tracking.clicked('twitter', ev); }
    };
    this.twttr.events.bind('tweet', this._onTweet);
    this.twttr.events.bind('click', this._onClick);
  },

  unsubscribeFromTweetEvents: function() {
    if(this._onTweet) {
      this.twttr.events.unbind('tweet', this._onTweet);
    }
    if(this._onClick) {
      this.twttr.events.unbind('click', this._onClick);
    }
  },

  willDestroy: function() {
    this._super();
    this.unsubscribeFromTweetEvents();
  }
});
