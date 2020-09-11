/**
 * BLOCK: myblock
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

import { RichText, MediaUpload, MediaUploadCheck  } from '@wordpress/block-editor';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { PanelBody, Button } = wp.components;
const { Fragment } = wp.element;

const ALLOWED_MEDIA_TYPES = [ 'audio' ];

const imageStyle = {
	width: '100%',
	height: '280px',
};

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Simple Card' ), // Block title.
	icon: 'smiley', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'myblock — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
        title: {
            type: 'string',
            source: 'html',
            selector: '.card__title',
        },
        description: {
            type: 'string',
            source: 'html',
            selector: '.card__description',
		},
		image: {
            type: 'string',
			default: 'https://www.w3schools.com/w3css/img_lights.jpg',
		},
    },

	edit: ({ attributes, setAttributes }) => {
		const { title, description, image } = attributes;

		const onTitleChange = title => {
			setAttributes( { title } );
		};
		const onDescriptionChange = description => {
			setAttributes( { description } );
		};
		const onSetImage = media => {
			setAttributes( { image: media.sizes.full.url } );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSetImage}
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							// value={ mediaId }
							render={ ( { open } ) => (
								<Button onClick={ open }>
									Open Media Library
								</Button>
							) }
						/>
					</MediaUploadCheck>
					</PanelBody>
				</InspectorControls>

				<div className="sample-card">
					<img className="card__image" src={image} style={imageStyle} />
					<div className="card__body">
						<RichText
							className="card__title"
							tagName="div" // The tag here is the element output and editable in the admin
							value={ title } // Any existing content, either from the database or an attribute default
							// formattingControls={ [ 'bold', 'italic' ] } // Allow the content to be made bold or italic, but do not allow other formatting options
							onChange={onTitleChange} // Store updated content as a block attribute
							placeholder={ __( 'Card Title...' ) } // Display this text before any content has been added by the user
							/>
						<RichText
							className="card__description"
							tagName="div" // The tag here is the element output and editable in the admin
							value={ description } // Any existing content, either from the database or an attribute default
							onChange={onDescriptionChange} // Store updated content as a block attribute
							placeholder={ __( 'Card Description...' ) } // Display this text before any content has been added by the user
							/>
						<div className="card__social-icons">
							<span class="dashicons dashicons-twitter"></span>
							<span class="dashicons dashicons-facebook"></span>
							<span class="dashicons dashicons-google"></span>
							<span class="dashicons dashicons-instagram"></span>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save: ({ attributes }) => {
		const { title, description, image } = attributes;

		return (
			<div className="sample-card">
				<img className="card__image" src={image} style={imageStyle} />
				<div className="card__body">
					<RichText.Content
						className="card__title"
						tagName="div" // The tag here is the element output and editable in the admin
						value={ title } // Any existing content, either from the database or an attribute default
						/>
					<RichText.Content
						className="card__description"
						tagName="div" // The tag here is the element output and editable in the admin
						value={ description } // Any existing content, either from the database or an attribute default
						/>
					<div className="card__social-icons">
						<span class="dashicons dashicons-twitter"></span>
						<span class="dashicons dashicons-facebook"></span>
						<span class="dashicons dashicons-google"></span>
						<span class="dashicons dashicons-instagram"></span>
					</div>
				</div>
			</div>
		);
	},
} );
