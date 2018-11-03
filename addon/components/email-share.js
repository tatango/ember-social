import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tracking: null, // optional injection
  subject: '',
  body: null,
  url: '',
  bodyText: computed('body', function(){
    var body = this.get('body');
    return body ? body + '\n\n' : '';
  }),
  href: computed('subject', 'bodyText', 'shareUrl', function(){
    var subject = encodeURIComponent(this.get('subject'));
    var body = encodeURIComponent(this.get('bodyText') + this.get('url'));
    return  "mailto:?subject="+ subject + "&body="+ body;
  }),
  tagName: 'a',
  linkTarget: '_top',
  attributeBindings: ['linkTarget:target', 'href'],

  click() {
    if (this.tracking && this.tracking.clicked) {

      this.tracking.clicked('email', {
        url: this.get('shareUrl')
      });
    }
  }

});
