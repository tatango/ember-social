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

test('visiting /twitter/share', function() {
  visit('/twitter/share');

  andThen(function() {
    equal(currentPath(), 'twitter.share');

    var exampleElementIds = [
      'no-parameters',
      'custom-url-and-text',
      'count-display-none',
      'count-display-horizontal',
      'count-display-vertical'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        equal(find('#' + exampleId + ' iframe').length, 1, 'Renders ' + exampleId);
      });

      equal(find('#block-provided a').length, 1, 'Renders web intent style');
      equal(find('#block-provided a').attr('href'), "https://twitter.com/intent/tweet?url=http%3A%2F%2Fexample.com%2Fshare-things&text=Help%2C%20I'm%20stuck%20in%20a%20tweet%20factory.", 'Renders href');
    }, 2500);
  });
});
