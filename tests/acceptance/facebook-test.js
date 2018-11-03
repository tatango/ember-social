import { currentPath, visit } from '@ember/test-helpers';
import { later } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | facebook');

test('share', async function(assert) {
  await visit('/facebook/share');

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

  later(function() {
    exampleElementIds.forEach(function(exampleId) {
      assert.dom('#' + exampleId + ' iframe').exists({ count: 1 }, 'Renders ' + exampleId);
    });

    assert.dom('#tag-name-a a').exists({ count: 1 }, 'Renders anchor tag');
  }, 2500);
});

test('like', async function(assert) {
  await visit('/facebook/like');

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

  later(function() {
    exampleElementIds.forEach(function(exampleId) {
      assert.dom('#' + exampleId + ' iframe').exists({ count: 1 }, 'Renders ' + exampleId);
    });
  }, 2500);
});
