import Ember from 'ember';

var Router = Ember.Router.extend({
  location: EmberSocialENV.locationType
});

Router.map(function() {
  this.route('tracking');
});

export default Router;
