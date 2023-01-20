/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { latitude, longitude, zoomLevel, locationName, width, height, query } = attributes;
	useEffect( () => {
		if ( locationName ) {
			setAttributes( { query: locationName } );
		} else if ( latitude && longitude ) {
			setAttributes( { query: `${ latitude },${ longitude }` } );
		}
	} );
	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( 'Map settings', 'simple-gmaps' ) }>
					<TextControl
						label="Location Name"
						value={ locationName }
						onChange={ ( value ) => setAttributes( { locationName: value } ) }
					/>
					<strong>Or</strong>
					<TextControl
						label="Latitude"
						value={ latitude }
						onChange={ ( value ) => setAttributes( { latitude: value } ) }
					/>
					<TextControl
						value={ longitude }
						label={ __( 'Longitude', 'simple-gmaps' ) }
						onChange={ ( value ) => setAttributes( { longitude: value } ) }
					/>
					<TextControl
						value={ width }
						label={ __( 'Width', 'simple-gmaps' ) }
						onChange={ ( value ) => setAttributes( { width: value } ) }
					/>
					<TextControl
						value={ height }
						label={ __( 'Height', 'simple-gmaps' ) }
						onChange={ ( value ) => setAttributes( { height: value } ) }
					/>
					<RangeControl
						label="Zoom Level"
						value={ zoomLevel }
						onChange={ ( value ) => setAttributes( { zoomLevel: value } ) }
						min={ 1 }
						max={ 22 }
					/>
				</PanelBody>
			</InspectorControls>
			<div className="xwp-map-container">
				<iframe
					width={ width }
					title="g-map"
					height={ height }
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					src={ `https://www.google.com/maps/embed/v1/place?key=AIzaSyBG1bG7xNR1ICq96E5QQfXT7bA8Hy_FF5Y&q=${ query }&zoom=${ zoomLevel }` }>
				</iframe>
			</div>
		</div>
	);
}
