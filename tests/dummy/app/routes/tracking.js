import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    return this.container.lookup('service:social-tracking');
  }
});
