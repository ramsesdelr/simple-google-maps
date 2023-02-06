/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import React, { useState } from 'react';


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;
	const { zoomLevel, query, width, height, apiKey } = attributes;
	const blockProps = useBlockProps.save();
	return (
		<div { ...blockProps }>
			<iframe
				width={ width }
				title="g-map"
				height={ height }
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				src={ `https://www.google.com/maps/embed/v1/place?key=${ apiKey }&q=${ query }&zoom=${ zoomLevel }` }>
			</iframe>
		</div>
	);
}
