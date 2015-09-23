import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
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
