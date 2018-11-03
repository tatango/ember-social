import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';

export default Route.extend({
  model: function(){
    return getOwner(this).lookup('service:social-tracking');
  }
});
