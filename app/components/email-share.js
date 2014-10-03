import Ember from 'ember';

export default Ember.Component.extend({
  tracking: null, // optional injection
  subject: '',
  body: null,
  url: '',
  bodyText: function(){
    var body = this.get('body');
    return body ? body + '\n\n' : '';
  }.property('body'),
  href: function(){
    var subject = encodeURIComponent(this.get('subject'));
    var body = encodeURIComponent(this.get('bodyText') + this.get('url'));
    return  "mailto:?subject="+ subject + "&body="+ body;
  }.property('subject', 'bodyText', 'shareUrl'),
  tagName: 'a',
  linkTarget: '_top',
  attributeBindings: ['linkTarget:target', 'href'],
  trackClick: function(){
    if (this.tracking && this.tracking.clicked) {

      this.tracking.clicked('email', {
        url: this.get('shareUrl')
      })
    }
  }.on('click')
});
