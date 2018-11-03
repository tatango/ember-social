import { find, findAll, currentPath, visit } from '@ember/test-helpers';
import { later } from '@ember/runloop';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | twitter');

test('share', async function(assert) {
  await visit('/twitter/share');

  assert.equal(currentPath(), 'twitter.share');

  var exampleElementIds = [
    'no-parameters',
    'custom-url-and-text'
  ];

  later(function() {
    exampleElementIds.forEach(function(exampleId) {
      assert.dom('#' + exampleId + ' iframe').exists({ count: 1 }, 'Renders ' + exampleId);
    });

    assert.dom('#block-provided a').exists({ count: 1 }, 'Renders web intent style');
    assert.dom('#block-provided a').hasAttribute(
      'href',
      "https://twitter.com/intent/tweet?url=http%3A%2F%2Fplyfe.github.io%2Fember-social&text=Help%2C%20I'm%20stuck%20in%20a%20tweet%20factory.&via=tweetfactory&related=tweet%2Cfactory&hashtags=tweet%2Cfactory",
      'Renders href'
    );
  }, 2500);
});

test('tweet', async function(assert) {
  await visit('/twitter/card');

  assert.equal(currentPath(), 'twitter.card');

  later(function(){
    assert.dom('.twitter-tweet').exists({ count: 2 }, 'Two twitter tweets were rendered.');
  }, 2500);
});
