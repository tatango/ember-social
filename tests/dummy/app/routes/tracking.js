import Route from '@ember/routing/route';

export default Route.extend({
  model: function(){
    return this.container.lookup('service:social-tracking');
  }
});
