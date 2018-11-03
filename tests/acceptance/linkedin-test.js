import { findAll, currentPath, visit } from '@ember/test-helpers';
import { later } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | linkedin');

test('share', async function(assert) {
  await visit('/linkedin/share');

  assert.equal(currentPath(), 'linkedin.share');

  var exampleElementIds = [
    'no-parameters',
    'custom-url',
    'show-count'
  ];

  later(function() {
    exampleElementIds.forEach(function(exampleId) {
      assert.dom('#' + exampleId + ' .IN-widget').exists({ count: 1 }, 'Renders ' + exampleId);
    });

    assert.dom('#tag-name-a a').exists({ count: 1 }, 'Renders link');
  }, 2500);
});
