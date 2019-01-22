var Backbone = require('backbone');
var ComponentView = require('./ComponentView');

module.exports = ComponentView.extend({
  tagName: 'span',

  events: {
    dblclick: 'openComponentSettings',
    keydown: function() {
      if (e.key === 'Backspace') {
        e.target.parentNode.removeChild(e.target);
      }
    }
  },

  initialize(o) {
    const model = this.model;
    ComponentView.prototype.initialize.apply(this, arguments);
    this.listenTo(model, 'dblclick active', this.openComponentSettings);
    const config = this.config;
    config.modal && (this.modal = config.modal);
  },

  openComponentSettings() {
    this.config.em
      .get('Editor')
      .Panels.getButton('views', 'open-tm')
      .set('active', true);
  },

  render() {
    ComponentView.prototype.render.apply(this, arguments);
    const name = this.attr.name || 'tag: not set';
    this.el.innerHTML = `{{ ${name} }}`;

    // Avoid strange behaviours while try to drag
    this.$el.attr('onmousedown', 'return false');
    return this;
  }
});
