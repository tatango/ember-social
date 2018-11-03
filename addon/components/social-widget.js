import { and } from '@ember/object/computed';
import Component from '@ember/component';
import layout from '../templates/components/social-widget';

export default Component.extend({
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

  facebookLike: and('like', 'facebook'),

  facebookShare: and('share', 'facebook'),

  twitterShare: and('share', 'twitter'),

  linkedinShare: and('share', 'linkedin'),

  emailShare: and('share', 'email', 'url')
});
