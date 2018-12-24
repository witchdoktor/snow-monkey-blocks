'use strict';

import toNumber from '../../src/js/helper/to-number';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, RangeControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/rating-box--item', {
	title: __( 'Rating box item', 'snow-monkey-blocks' ),
	icon: 'editor-alignleft',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/rating-box' ],
	attributes: {
		title: {
			source: 'html',
			selector: '.smb-rating-box__item__title',
		},
		rating: {
			type: 'number',
			default: 0,
		},
		color: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes } ) {
		const { title, rating, color } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Rating box item Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Rating', 'snow-monkey-blocks' ) }
							value={ rating }
							onChange={ ( value ) => setAttributes( { rating: toNumber( value, 1, 10 ) } ) }
							min="1"
							max="10"
						/>

						<BaseControl label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ color }
								onChange={ ( value ) => setAttributes( { color: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="smb-rating-box__item">
					<RichText
						className="smb-rating-box__item__title"
						placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
						value={ title }
						formattingControls={ [] }
						multiline={ false }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>

					<div className="smb-rating-box__item__evaluation">
						<div className="smb-rating-box__item__evaluation__bar">
							<div className="smb-rating-box__item__evaluation__numeric">
								{ rating }
							</div>
							<div className="smb-rating-box__item__evaluation__rating" style={ { width: `${ rating * 10 }%`, backgroundColor: color } }></div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, rating, color } = attributes;

		return (
			<div className="smb-rating-box__item">
				<div className="smb-rating-box__item__title" >
					<RichText.Content value={ title } />
				</div>

				<div className="smb-rating-box__item__evaluation">
					<div className="smb-rating-box__item__evaluation__bar">
						<div className="smb-rating-box__item__evaluation__numeric">
							{ rating }
						</div>
						<div className="smb-rating-box__item__evaluation__rating" style={ { width: `${ rating * 10 }%`, backgroundColor: color } }></div>
					</div>
				</div>
			</div>
		);
	},
} );
