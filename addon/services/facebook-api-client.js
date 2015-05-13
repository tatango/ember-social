import Ember from 'ember';

/* globals FB */

var facebookScriptPromise;

export default Ember.Object.extend({
  env: Ember.computed(function() {
    return this.container.lookupFactory('config:environment');
  }),
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
   * component will also look for a FACEBOOK_APP_ID in env, a global, or a meta tag of the form:
   *
   *   <meta property="fb:app_id" content="[FB_APP_ID]" />
   */
  appId: function(id){
    return id || this.get('env').FACEBOOK_APP_ID || Ember.$("meta[property='fb:app_id']").attr('content') || window.FACEBOOK_APP_ID;
  },

  currentId: null,
  updateCurrentId: function(id) {
    if(id !== this.get('currentId')) {
      this.set('currentId', id);
      this.set('currentIdIsUpdated', true);
    } else {
      this.set('currentIdIsUpdated', false);
    }
  },
  currentIdIsUpdated: false,

  load: function(options) {
    var appId = this.appId(options && options.appId);
    this.updateCurrentId(appId);
    if (!facebookScriptPromise || this.get('currentIdIsUpdated')) {
      facebookScriptPromise = new Ember.RSVP.Promise(function(resolve/*, reject*/) {
        if (Ember.$('#fb-root').length === 0) {
          Ember.$('body').append('<div id="fb-root"></div>');
        }
        window.fbAsyncInit = function() {
          FB.init({
            appId      : appId,
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

  }
});
