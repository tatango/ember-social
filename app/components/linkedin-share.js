import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: null, // injected
  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Linkedin share button UI
  isCustomLink: Ember.computed.equal('tagName','a'),
  useLinkedinUi: Ember.computed.not('isCustomLink'),

  url: null, // Defaults to current url
  createLinkedinShareButton: function() {
    var self = this;
    this.socialApiClient.load().then(function(IN) {
      self.IN = IN;
      self.shareHandlerName = IN.shareHandlerName;
      if (self.state !== 'inDOM') { return; }
      if (self.get('useLinkedinUi')) {
        var attrs = [];
        var url = self.get('url');
        if (url) {
          attrs.push('data-url="' + url + '"');
        }
        attrs.push('data-onsuccess="' + self.shareHandlerName + '"');
        self.$().html('<script type="IN/Share" ' + attrs.join(' ') + '></script>');
        IN.parse(self.get('element'));
      } else {
        self.$().attr('href', '#');
      }
    });
  }.on('didInsertElement'),

  showShareDialog: function(e){
    this.socialApiClient.clicked(this.get('url') || window.location.href);
    if (this.get('useLinkedinUi')) {
      return;
    }
    this.IN.UI.Share().params({
      url: this.get('url')
    }).place().success(window[this.shareHandlerName]);
    e.preventDefault();
  }.on('click')
});
