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
    //TODO: Use ember-testing waiter api to wait on async twitter stuff
    Ember.run.later(function() {
      equal(find('#simple iframe').length, 1, 'Renders Tweet button iframe');
    }, 2500);
  });
});
