import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { skip } from 'qunit';

moduleForComponent('social-widget', 'Integration | Component | social widget', {
  integration: true
});

skip('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{social-widget}}`);

  assert.dom('*').hasText('');

  // Template block usage:
  this.render(hbs`
    {{#social-widget}}
      template block text
    {{/social-widget}}
  `);

  assert.dom('*').hasText('template block text');
});
