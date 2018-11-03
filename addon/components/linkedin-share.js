import { equal, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  socialApiClient: service('linkedin-api-client'), // injected
  tagName: 'div', // set tagName to 'a' in handlebars to use your own css/content
                  // instead of the standard Linkedin share button UI
  isCustomLink: equal('tagName','a'),
  useLinkedinUi: not('isCustomLink'),

  count: null, //can be 'top' or 'right'
  url: null, // Defaults to current url

  didInsertElement() {
    
    this.get('socialApiClient').load().then((IN) => {
      this.IN = IN;
      this.shareHandlerName = IN.shareHandlerName;
      if (this._state !== 'inDOM') { return; }
      if (this.get('useLinkedinUi')) {
        var attrs = [];
        var url = this.get('url');
        var count = this.get('count');
        if (url) {
          attrs.push('data-url="' + url + '"');
        }
        if(count) {
          attrs.push('data-counter="' + count +'"');
        }
        attrs.push('data-onsuccess="' + this.shareHandlerName + '"');
        this.element.innerHTML = '<script type="IN/Share" ' + attrs.join(' ') + '></script>'
        IN.parse(this.get('element'));
      } else {
        this.element.setAttribute('href', '#');
      }
    });
  },

  click(e) {
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
  }

});
