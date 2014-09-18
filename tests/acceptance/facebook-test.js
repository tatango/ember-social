import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Facebook', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /facebook', function() {
  visit('/facebook');

  andThen(function() {
    equal(currentPath(), 'facebook');

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
        equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });

      equal(find('#tag-name-a a').length, 1, 'Renders anchor tag');
    }, 2500);
  });
});
