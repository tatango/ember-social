import Ember from 'ember';
import layout from '../templates/components/social-widget';

export default Ember.Component.extend({
  classNames: ['social-widget'],
  layout: layout,

  url: null,

  like: true,

  share: true,

  facebook: true,

  twitter: true,

  linkedin: true,

  email: true,

  emailLinkText: 'Share via email',

  emailBody: 'Hope you enjoy it!',

  emailSubject: 'Check Out This Link',

  facebookLike: Ember.computed.and('like', 'facebook'),

  facebookShare: Ember.computed.and('share', 'facebook'),

  twitterShare: Ember.computed.and('share', 'twitter'),

  linkedinShare: Ember.computed.and('share', 'linkedin'),

  emailShare: Ember.computed.and('share', 'email', 'url')
});
