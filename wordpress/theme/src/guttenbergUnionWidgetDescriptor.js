/** @jsx dom */
const { createElement: dom, Fragment } = wp.element;
const { TextControl, Placeholder } = wp.components;
const { registerBlockType } = wp.blocks;

registerBlockType('gutenberg-union/union', {
	title: 'Union Widget',
	icon: 'media-document',
	category: 'common',
	attributes: {
		widget: {
			type: 'string',
			source: 'attribute',
			attribute: 'data-union-widget',
			selector: 'script',
		},
		namespace: {
			type: 'string',
			source: 'attribute',
			attribute: 'data-union-namespace',
			selector: 'script',
		},
	},
	edit({ setAttributes, attributes }) {
		const handleOnChangeWidget = newValue => {
			const sanitizedValue = newValue ? newValue.toLowerCase() : '';
			const namespace = `${sanitizedValue}-${Math.random()
				.toString(36)
				.substring(2, 15)}`;

			setAttributes({ widget: sanitizedValue, namespace });
		};

		return (
			<Placeholder>
				<TextControl
					placeholder="Fill in a Widget name..."
					label="Widget name"
					value={attributes.widget}
					onChange={handleOnChangeWidget}
				/>
			</Placeholder>
		);
	},
	save({ attributes }) {
		const { namespace, widget } = attributes;

		return (
			<Fragment>
				<div id={namespace} />
				<script
					type="application/json"
					data-union-widget={widget}
					data-union-container={namespace}
					data-union-namespace={namespace}
				/>
			</Fragment>
		);
	},
});
