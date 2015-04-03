import Ember from 'ember';

export default Ember.Component.extend({
  tracking: null, // optional injection
  subject: '',
  body: null,
  url: '',
  bodyText: Ember.computed('body', function(){
    var body = this.get('body');
    return body ? body + '\n\n' : '';
  }),
  href: Ember.computed('subject', 'bodyText', 'shareUrl', function(){
    var subject = encodeURIComponent(this.get('subject'));
    var body = encodeURIComponent(this.get('bodyText') + this.get('url'));
    return  "mailto:?subject="+ subject + "&body="+ body;
  }),
  tagName: 'a',
  linkTarget: '_top',
  attributeBindings: ['linkTarget:target', 'href'],
  trackClick: Ember.on('click', function(){
    if (this.tracking && this.tracking.clicked) {

      this.tracking.clicked('email', {
        url: this.get('shareUrl')
      });
    }
  })
});
