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

  createTwitterShareButton: function() {
    var self = this;

    loadTwitter().then(function(twttr) {
      twttr.widgets.createShareButton(
        'http://example.com/',
        self.get('element'),
        {
          count: 'none',
          text: 'Sharing a URL using the Tweet Button'
        }).then(function (el) {
          console.log("here you go", el);
          console.log("Button created.");
        });
    });
  }.on('didInsertElement')

});
