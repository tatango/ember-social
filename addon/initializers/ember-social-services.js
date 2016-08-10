export default {
  name: 'ember-social-services',
  initialize: function() {
    let application = arguments[1] || arguments[0];
    var facebookPluginComponents = ['facepile', 'like', 'share'];

    facebookPluginComponents.forEach(function(plugin) {
      application.inject('component:facebook-' + plugin, 'socialApiClient', 'service:facebook-api-client');
    });

    application.inject('component:twitter-share', 'socialApiClient', 'service:twitter-api-client');

    application.inject('component:linkedin-share', 'socialApiClient', 'service:linkedin-api-client');

    application.inject('component:twitter-card', 'socialApiClient', 'service:twitter-api-client');
  }
};
