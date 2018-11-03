import EmberRouter from '@ember/routing/router';
import config from './config/environment';

<<<<<<< HEAD
var Router = Ember.Router.extend({
  location: config.locationType
=======
const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
>>>>>>> 0e5d88f... message
});

Router.map(function() {
  this.route('facebook', function() {
    this.route('like');
    this.route('share');
  });
  this.route('twitter', function() {
    this.route('share');
    this.route('card');
  });
  this.route('linkedin', function() {
    this.route('share');
  });
  this.route('email', function() {
    this.route('share');
  });
  this.route('widget');
  this.route('tracking');
});

export default Router;
