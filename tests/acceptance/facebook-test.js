import Ember from 'ember';
import startApp from '../helpers/start-app';
import { module, test } from 'qunit';

var App;

module('Acceptance: Facebook', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
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
      'layout-icon'
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
      'layout-box-count'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        assert.equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });
    }, 2500);
  });
});
