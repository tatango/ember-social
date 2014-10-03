import Ember from 'ember';

export default Ember.Component.extend({
  tracking: null, // optional injection
  subject: null,
  body: null,
  url: null,
  bodyText: function(){
    var body = this.get('body');
    return body ? body + '\n\n' : '';
  }.property('body'),
  href: function(){
    var subjectText = this.get('subject') || document.title;
    var subject = encodeURIComponent(subjectText);
    var shareUrl = this.get('shareUrl') || document.URL;
    var body = encodeURIComponent(this.get('bodyText') + shareUrl);
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
