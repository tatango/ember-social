import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import startApp from '../../tests/helpers/start-app';
import Ember from 'ember';

moduleForAcceptance('Acceptance | facebook', {
  beforeEach: function() {
    this.application = startApp();
    if (window.FB) {
      // Acceptance testing creates an unrealistic scenario where the app is
      // reloaded between tests without reloading the page and reseting the
      // window object. After initially loading the SDK, stub FB in the service
      // with the loaded SDK.
      var facebookAPI = this.application.__container__.lookup('service:facebook-api-client');
      facebookAPI.set('facebookSDK', Ember.RSVP.resolve(window.FB));
    }
  }
});

test('share', function(assert) {
  visit('/facebook/share');

  andThen(function() {
    assert.equal(currentPath(), 'facebook.share');

    var exampleElementIds = [
      'no-parameters',
      'custom-url',
      'layout-icon-link',
      'layout-box-count',
      'layout-button-count',
      'layout-button',
      'layout-link',
      'layout-icon',
      'custom-load-sdk'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        assert.equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });

      assert.equal(find('#tag-name-a a').length, 1, 'Renders anchor tag');
    }, 2500);
  });
});

test('like', function(assert) {
  visit('/facebook/like');

  andThen(function() {
    assert.equal(currentPath(), 'facebook.like');

    var exampleElementIds = [
      'no-parameters',
      'custom-url',
      'custom-action',
      'layout-standard',
      'layout-button-count',
      'layout-button',
      'layout-box-count',
      'custom-load-sdk'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        assert.equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });
    }, 2500);
  });
});
