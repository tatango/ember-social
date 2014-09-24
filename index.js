function Addon(project) {
  this.project = project;
}
Addon.prototype.name = function() {
  return 'ember-social';
};
module.exports = Addon;
