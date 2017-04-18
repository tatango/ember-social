import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('service:facebook-api-client', 'Unit | Service | FacebookApiClient', {
  unit: true,
  beforeEach: function() {
    window.FB = undefined;
    window.fbAsyncInit = undefined;
    Ember.$('#facebook-jssdk').remove();
  }
});

test('it loads and initializes the Facebook SDK', function(assert) {
  var done = assert.async();

  var service = this.subject();
  service.load().then((FB) => {
    assert.ok(FB, 'Loads and returns the SDK');
    assert.ok(window.fbAsyncInit.hasRun, 'Initializes the SDK');
    done();
  });
});

test('it throws an error when the Facebook SDK has already been loaded externally', function(assert) {
  assert.expect(1);
  window.FB = true;
  window.fbAsyncInit = { hasRun: true };

  var service = this.subject();
  assert.throws(function() {
    service.load();
  }, /The Facebook SDK has already been loaded/);
});

test('it returns the FB object when the facebookSDK attribute is set', function(assert) {
  var done = assert.async();
  window.FB = true;
  window.fbAsyncInit = { hasRun: true };

  var service = this.subject();
  service.set('facebookSDK', Ember.RSVP.resolve('SDK'));
  service.load().then((FB) => {
    assert.equal(FB, 'SDK', 'Returns the SDK');
    done();
  });
});
