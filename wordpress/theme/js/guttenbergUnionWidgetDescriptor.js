"use strict";

/** @jsx dom */
var _wp$element = wp.element,
    dom = _wp$element.createElement,
    Fragment = _wp$element.Fragment;
var _wp$components = wp.components,
    TextControl = _wp$components.TextControl,
    Placeholder = _wp$components.Placeholder;
var registerBlockType = wp.blocks.registerBlockType;
registerBlockType('gutenberg-union/union', {
  title: 'Union Widget',
  icon: 'media-document',
  category: 'common',
  attributes: {
    widget: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-union-widget',
      selector: 'script'
    },
    namespace: {
      type: 'string',
      source: 'attribute',
      attribute: 'data-union-namespace',
      selector: 'script'
    }
  },
  edit: function edit(_ref) {
    var setAttributes = _ref.setAttributes,
        attributes = _ref.attributes;

    var handleOnChangeWidget = function handleOnChangeWidget(newValue) {
      var sanitizedValue = newValue ? newValue.toLowerCase() : '';
      var namespace = sanitizedValue + "-" + Math.random().toString(36).substring(2, 15);
      setAttributes({
        widget: sanitizedValue,
        namespace: namespace
      });
    };

    return dom(Placeholder, null, dom(TextControl, {
      placeholder: "Fill in a Widget name...",
      label: "Widget name",
      value: attributes.widget,
      onChange: handleOnChangeWidget
    }));
  },
  save: function save(_ref2) {
    var attributes = _ref2.attributes;
    var namespace = attributes.namespace,
        widget = attributes.widget;
    return dom(Fragment, null, dom("div", {
      id: namespace
    }), dom("script", {
      type: "application/json",
      "data-union-widget": widget,
      "data-union-container": namespace,
      "data-union-namespace": namespace
    }));
  }
});