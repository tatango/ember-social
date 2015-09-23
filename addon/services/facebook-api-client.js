import Ember from 'ember';

/* globals FB */

var facebookScriptPromise;

export default Ember.Service.extend({
  /*
   * A tracking object implementing `shared(serviceName, payload)` and/or
   * `clicked(serviceName, payload)` can be set on this object, and will
   * be delegated to if present. Not all Facebook
   * components support these events in all configurations.
   */
  tracking: null, // optional injection

  /*
   * This is required for certain uses of plugins, e.g. when using tagName="a"
   * for the facebook-share component.
   *
   * You can simply specify it in the handlebars when using this component, but this
   * component will also look for a global FACEBOOK_APP_ID or a meta tag of the form:
   *
   *   <meta property="fb:app_id" content="[FB_APP_ID]" />
   */
  appId: function(){
    return Ember.$("meta[property='fb:app_id']").attr('content') || window.FACEBOOK_APP_ID;
  },

  load: function() {
    var self = this;
    if (!facebookScriptPromise) {
      facebookScriptPromise = new Ember.RSVP.Promise(function(resolve/*, reject*/) {
        if (Ember.$('#fb-root').length === 0) {
          Ember.$('body').append('<div id="fb-root"></div>');
        }
        window.fbAsyncInit = function() {
          FB.init({
            appId      : self.appId(),
            xfbml      : true,
            version    : 'v2.1'
          });
          Ember.run(function(){
            resolve(FB);
          });
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
  },

  clicked: function(payload) {
    var tracking = this.tracking;
    if(!tracking) { return; }
    if(tracking.clicked) {
      tracking.clicked('facebook', payload);
    }
  },

  shared: function(payload) {
    var tracking = this.tracking;
    if(!tracking) { return; }
    if(tracking.shared) {
      tracking.shared('facebook', payload);
    }
  }
});
