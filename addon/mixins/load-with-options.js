import Ember from 'ember';

// Mixin used for components where appId can be passed in to load api client
export default Ember.Mixin.create({
  appId: null, // optional
  loadOptions: Ember.computed('appId', function() {
    return {
      appId: this.get('appId')
    };
  }),
  loadSocialApiClient: function() {
    return this.get('socialApiClient').load(this.get('loadOptions'));
  },
});
