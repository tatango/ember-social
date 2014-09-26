import Ember from 'ember';

/* globals IN */

var linkedinScriptPromise;
function loadLinkedin() {

  if (!linkedinScriptPromise) {
    linkedinScriptPromise = new Ember.RSVP.Promise(function(resolve/*, reject*/) {
      Ember.$.getScript("//platform.linkedin.com/in.js?async=true", function success() {
        IN.Event.on(IN, 'systemReady', Ember.run.bind(null, resolve));
        IN.init();
      });
    });
  }
  return linkedinScriptPromise;
}

export default Ember.Component.extend({

  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Linkedin share button UI
  isCustomLink: Ember.computed.equal('tagName','a'),
  useLinkedinUi: Ember.computed.not('isCustomLink'),

  url: null, // Defaults to current url
  createLinkedinShareButton: function() {
    var self = this;
    loadLinkedin().then(function() {
      if (self.get('useLinkedinUi')) {
        var attrs = [];
        var url = self.get('url');
        if (url) {
          attrs.push('data-url="' + url + '"');
        }
        self.$().html('<script type="IN/Share" ' + attrs.join(' ') + '></script>');
        IN.parse(self.get('element'));
      } else {
        self.$().attr('href', '#');
      }
    });
  }.on('didInsertElement'),

  showShareDialog: function(e){
    if (this.get('useLinkedinUi')) { return; } // doesn't need a click handler
    IN.UI.Share().params({
      url: this.get('url')
    }).place();
    e.preventDefault();
  }.on('click')
});
