import Ember from 'ember';

export default Ember.Component.extend({
  socialApiClient: Ember.inject.service('linkedin-api-client'), // injected
  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Linkedin share button UI
  isCustomLink: Ember.computed.equal('tagName','a'),
  useLinkedinUi: Ember.computed.not('isCustomLink'),

  count: null, //can be 'top' or 'right'
  url: null, // Defaults to current url
  createLinkedinShareButton: Ember.on('didInsertElement', function() {
    var self = this;
    this.get('socialApiClient').load().then(function(IN) {
      self.IN = IN;
      self.shareHandlerName = IN.shareHandlerName;
      if (self._state !== 'inDOM') { return; }
      if (self.get('useLinkedinUi')) {
        var attrs = [];
        var url = self.get('url');
        var count = self.get('count');
        if (url) {
          attrs.push('data-url="' + url + '"');
        }
        if(count) {
          attrs.push('data-counter="' + count +'"');
        }
        attrs.push('data-onsuccess="' + self.shareHandlerName + '"');
        self.$().html('<script type="IN/Share" ' + attrs.join(' ') + '></script>');
        IN.parse(self.get('element'));
      } else {
        self.$().attr('href', '#');
      }
    });
  }),

  showShareDialog: Ember.on('click', function(e){
    var self = this;
    this.get('socialApiClient').clicked(this.get('url') || window.location.href);
    if (this.get('useLinkedinUi')) { return; }
    function showDialog(IN) {
      IN.UI.Share().params({
        url: self.get('url')
      }).place().success(window[self.shareHandlerName]);
    }
    if (this.IN) {
      showDialog(this.IN);
    } else {
      this.get('socialApiClient').load().then(function(IN) {
        showDialog(IN);
      });
    }
    e.preventDefault();
  })
});
