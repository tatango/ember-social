import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: LinkedIn', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /linkedin/share', function() {
  visit('/linkedin/share');

  andThen(function() {
    equal(currentPath(), 'linkedin.share');

    var exampleElementIds = [
      'no-parameters',
      'custom-url'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        equal(find('#' + exampleId + ' .IN-widget').length, 1, 'Renders ' + exampleId);
      });

      equal(find('#tag-name-a a').length, 1, 'Renders link');
    }, 2500);
  });
});
