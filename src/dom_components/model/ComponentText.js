const Component = require('./Component');

module.exports = Component.extend({
  defaults: {
    ...Component.prototype.defaults,
    type: 'text',
    textable: 1,
    droppable: '[data-datatype=tag]',
    editable: true,
    layerable: false
  }
});
