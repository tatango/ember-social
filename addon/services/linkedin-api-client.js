import { bind } from '@ember/runloop';
import { Promise } from 'rsvp';
import { guidFor } from '@ember/object/internals';
import Service from '@ember/service';

/* globals IN */

var linkedinScriptPromise;

export default Service.extend({
  /*
   * A tracking object implementing `shared(serviceName, payload)` and/or
   * `clicked(serviceName, payload)` can be set on this object, and will
   * be delegated to if present.
   */
  tracking: null, // optional injection
  load: function() {
    if (!linkedinScriptPromise) {
      var shareHandlerName = 'linkedin_share_' + guidFor(this);
      var tracking = this.tracking;
      window[shareHandlerName] = function(sharedUrl) {
        if(!tracking) { return; }
        if(tracking.shared) {
          tracking.shared('linkedin',  { url: sharedUrl });
        }
      };
      linkedinScriptPromise = new Promise(function(resolve/*, reject*/) {

        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//platform.linkedin.com/in.js?async=true";
          fjs.parentNode.insertBefore(js, fjs);
          js.onload = function() {
            IN.shareHandlerName = shareHandlerName;
            IN.Event.on(IN, 'systemReady', bind(null, resolve, IN));
            IN.init();
          }
        }(document, 'script', 'linkedin-jssdk'));

       
        
      });
    }
    return linkedinScriptPromise;
  },

  clicked: function(sharedUrl) {
    var tracking = this.tracking;
    if(!tracking) { return; }
    if(tracking.clicked) {
      tracking.clicked('linkedin', { url: sharedUrl });
    }
  }
});
