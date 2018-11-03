import { bind } from '@ember/runloop';
import $ from 'jquery';
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
        $.getScript("//platform.linkedin.com/in.js?async=true", function success() {
          IN.shareHandlerName = shareHandlerName;
          IN.Event.on(IN, 'systemReady', bind(null, resolve, IN));
          IN.init();
        });
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
