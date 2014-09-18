import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Twitter', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /twitter', function() {
  visit('/twitter');

  andThen(function() {
    equal(currentPath(), 'twitter');

    var exampleElementIds = [
      'no-parameters',
      'custom-url-and-text',
      'count-display-none',
      'count-display-horizontal',
      'count-display-vertical'
    ];

    //TODO: Use ember-testing waiter api to wait on async twitter stuff
    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });
    }, 2500);
  });
});
