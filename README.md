# Ember-Social

Ember-Social is an Ember component library for social sharing widgets. Think Tweet buttons, Facebook like buttons, Linked In share buttons, etc.

We welcome contributions. Adding share buttons can be a tedious, annoying part of a front-end developers. Let's make this library make it easy for everyone.

## Installation

`ember install ember-social`

## Usage

### Facebook

#### Like

Like the current URL:

`{{facebook-like}}`

Like the specified URL:

`{{facebook-like url='http://plyfe.github.io/ember-social'}}`

Specifying Actions:

`{{facebook-like fb-action='recommend'}}`

Specify whether to include faces:

`{{facebook-like fb-show-faces='false'}}`

Specify whether to include the share button:

`{{facebook-like fb-share='false'}}`

Specify width and size properties:

`{{facebook-like fb-width='200' fb-size='large'}}`

##### Layouts

Use the `fb-layout` property for specifying different layouts:

`standard` The standard like button
`button_count` Includes a count of the number of likes
`button` Just the button without any extra text to the side
`box_count` Similar to `button_count`, but with the thumbs-up box above the like button

`{{facebook-like fb-layout='button_count'}}`

#### Share

Share the current URL:

`{{facebook-share}}`

Share the specified URL:

`{{facebook-share url='http://plyfe.github.io/ember-social'}}`

##### Layouts

`icon_link` No button-like background, just icon and text
`box_count` Show share count above the button
`button_count` Show share count to the right of the button
`button` Just the button
`link` A text link
`icon` Just the icon, no button or text

`{{facebook-share fb-layout='link'}}`

As an 'a' tag:

```handlebars
{{#facebook-share tagName="a" url='http://plyfe.github.io/ember-social'}}
  Share this article on Facebook
{{/facebook-share}}
```

##### Themes

`light`
`dark`

`{{facebook-share fb-colorscheme='dark'}}`

### Twitter

#### Share

Current URL:

`{{twitter-share}}`

Specified URL:

`{{twitter-share url='http://plyfe.github.io/ember-social'}}`

Specified Text (for the tweet):

`{{twitter-share text="Help, I'm stuck in a tweet factory!"}}`

As an 'a' tag:

```handlebars
{{#twitter-share tagName='a'}}
Tweet this article
{{/twitter-share}}
```

##### Count Display

`none` Don't show the number of tweets
`horizontal` Show the count to the right of the button
`vertical` Show the count above the button

`{{twitter-share count='horizontal'}}`

##### Web Intent System

Twitter SDK can take several additional tags for constructing a tweet:

`hashtags` Hashtags to use in the tweet
`related` Related accounts for Twitter to suggest to follow after the tweet is sent
`via` The account to @ as responsible for the share

`{{twitter-share via='tweetfactory' related='tweet,factory' hashtags='tweet,factory'}}`

#### Card

Twitter cards require a tweet id to link to a specific tweet:

`{{twitter-card tweet-id='463440424141459456'}}`

To display media with the card, set `cards` to false:

`{{twitter-card tweet-id='463440424141459456' cards=false}}`

### LinkedIn

#### Share

Current URL:

`{{linkedin-share}}`

Specified URL:

`{{linkedin-share url='http://plyfe.github.io/ember-social'}}`

As an 'a' tag:

```handlebars
{{#linkedin-share tagName="a" url='http://plyfe.github.io/ember-social'}}
  Share this article on LinkedIn
{{/linkedin-share}}
```

##### Count Display

`top` Display count above the button
`right` Display count to the right of the button

`{{linkedin-share count='right'}}`

### Email

Specified `subject`, `body` and `url` attributes. Shares via `mailto` anchor tag.

```handlebars
{{#email-share subject=`Check out this link` url='http://plyfe.github.io/ember-social' body="Help, I'm stuck in a tweet factory!"}}
Share via email.
{{/email-share}}
```

### Social Widget

Current URL:

`{{social-widget}}`

Specified URL: (adds email component)

`{{social-widget url='http://plyfe.github.io/ember-social'}}`

Email Customization: (optional)

`emailLinkText` The text to display for the link in the widget
`emailBody` The body of the email
`emailSubject` The subject of the email

`{{social-widget url='http://plyfe.github.io/ember-social' emailLinkText='Email Share' emailBody='I really liked this article, enjoy!' emailSubject='Great Read...'}}`

#### Layouts

`like` False to disable like widgets
`share` False to disable share widgets
`facebook` False to disable Facebook widgets
`twitter` False to disable Twitter widget
`linkedin` False to disable LinkedIn widget
`email` False to disable email widget

`{{social-widget like=false linkedin=false}}`

## Contributing

This README outlines the details of collaborating on this Ember addon.

[![Build Status](https://travis-ci.org/plyfe/ember-social.svg?branch=master)](https://travis-ci.org/plyfe/ember-social)

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running Dummy App

The dummy app demonstrates and explains usage quite well.

  * `ember server`
  * Visit your app at http://localhost:4200.

To use in your app, follow the instructions for using ember-cli addons at ember-cli.com.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### TODO

* Implement click/share tracking for `{{facebook-like}}`

### Contributors

Thanks to Plyfe for sponsoring initial development and open-sourcing. ember-social authors include: Chris LoPresto, Luke Melia, and Danielle Adams.
