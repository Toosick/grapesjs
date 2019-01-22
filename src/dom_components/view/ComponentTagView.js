var Backbone = require('backbone');
var ComponentView = require('./ComponentView');

module.exports = ComponentView.extend({
  tagName: 'span',

  events: {
    dblclick: 'openModal',
    click: 'logModel',
    keydown: function() {
      if (e.key === 'Backspace') {
        e.target.parentNode.removeChild(e.target);
      }
    }
  },

  initialize(o) {
    const model = this.model;
    ComponentView.prototype.initialize.apply(this, arguments);
    this.listenTo(model, 'dblclick active', this.openModal);
    this.listenTo(model, 'click', this.logModel);
    const config = this.config;
    config.modal && (this.modal = config.modal);
  },

  logModel() {
    console.log(this.model);
  },

  /**
   * Open dialog for image changing
   * @param  {Object}  e  Event
   * @private
   * */
  openModal(e) {
    var em = this.opts.config.em;
    var editor = em ? em.get('Editor') : '';
    var modal = editor.Modal;
    modal.setTitle('Select Merge Field');
    modal.setContent('Hello world');
    modal.open();
  },

  render(...args) {
    ComponentView.prototype.render.apply(this, arguments);
    const name = this.attr.name || 'tag: not set';
    this.el.innerHTML = `{{ ${name} }}`;

    // Avoid strange behaviours while try to drag
    this.$el.attr('onmousedown', 'return false');
    return this;
  }
});
