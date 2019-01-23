const Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: {
      ...Component.prototype.defaults,
      type: 'tag',
      name: 'Tag',
      tagName: 'span',
      badgable: 1,
      textable: 1,
      editable: 1,
      draggable: 1,
      droppable: 0,
      highlightable: 1,
      removable: 1,
      attributes: {
        'data-datatype': 'tag',
        'data-gjs-type': 'tag',
        contenteditable: 'false'
      },
      content: '{{ TAG }}',
      traits: [
        {
          type: 'select',
          label: 'Name',
          name: 'name',
          changeProp: 1,
          options: [
            {
              value: 'variable1',
              name: 'variable1'
            },
            {
              value: 'variable2',
              name: 'variable2'
            }
          ]
        }
      ]
    },
    handleNameChange() {
      const name = this.changed.name;
      this.set({
        attributes: {
          ...this.attributes.attributes,
          name
        },
        content: `{{ ${name} }}`
      });
    },

    initialize(o, opt) {
      Component.prototype.initialize.apply(this, arguments);
      this.listenTo(this, 'change:name', this.handleNameChange);
    }
  },
  {
    /**
     * Detect if the passed element is a valid component.
     * In case the element is valid an object abstracted
     * from the element will be returned
     * @param {HTMLElement}
     * @return {Object}
     * @private
     */
    isComponent(el) {
      var result = '';
      if (el.tagName === 'SPAN' && el.dataset.tag === '1') {
        result = { type: 'tag' };
      }
      return result;
    }
  }
);
