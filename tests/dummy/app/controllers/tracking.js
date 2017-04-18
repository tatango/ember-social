import Ember from 'ember';
export default Ember.Controller.extend({
  facebookAPIClient: Ember.inject.service('facebook-api-client'),
  facebookSDK: Ember.computed('', function() {
    return this.get('facebookAPIClient').load();
  })
});
