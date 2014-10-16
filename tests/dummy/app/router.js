import Ember from 'ember';

var Router = Ember.Router.extend({
  location: DummyENV.locationType
});

Router.map(function() {
  this.resource('facebook', function() {
    this.route('facepile');
    this.route('like');
    this.route('share');
    this.route('feed');
  });
  this.resource('twitter', function() {
    this.route('share');
  });
  this.resource('linkedin', function() {
    this.route('share');
  });
  this.resource('email', function() {
    this.route('share');
  });
  this.route('tracking');
});

export default Router;
