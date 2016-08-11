import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Ember from 'ember';

moduleForAcceptance('Acceptance | linkedin');

test('share', function(assert) {
  visit('/linkedin/share');

  andThen(function() {
    assert.equal(currentPath(), 'linkedin.share');

    var exampleElementIds = [
      'no-parameters',
      'custom-url',
      'show-count'
    ];

    Ember.run.later(function() {
      exampleElementIds.forEach(function(exampleId) {
        assert.equal(find('#' + exampleId + ' .IN-widget').length, 1, 'Renders ' + exampleId);
      });

      assert.equal(find('#tag-name-a a').length, 1, 'Renders link');
    }, 2500);
  });
});
