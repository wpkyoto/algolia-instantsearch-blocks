/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { StaticRelatedItemAttributeSettings } from './block.interfaces';
/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';

const initialAttributes: StaticRelatedItemAttributeSettings = {
	hits: {
		type: 'array'
	},
	indexName: {
		type: 'string',
		default: 'wp_posts_post'
	},
	displaySearchForm: {
		type: 'boolean',
		default: true,
	},
	isUsingPaidPlan: {
		type: 'boolean',
		default: false,
	},
	displayPostDate: {
		type: 'boolean',
		default: true,
	},
	displayPostAuthor: {
		type: 'boolean',
		default: true,
	},
	displayPostCategory: {
		type: 'boolean',
		default: true,
	},
	displayPostTags: {
		type: 'boolean',
		default: true,
	},
	displayPostContentRadio: {
		type: "string",
		default: "excerpt"
	},
	excerptLength: {
		type: "number",
		default: 55,
	},
	enableExperimentalRelatedItems: {
		type: 'boolean',
		default: true,
	},
	categoryScore: {
		type: "number",
		default: 1,
	},
	tagScore: {
		type: "number",
		default: 1,
	},
	postTitleScore: {
		type: "number",
		default: 1,
	},
	hitsItems: {
		type: "number",
		default: 10
	},
	listLayout: {
		type: 'string',
		default: 'list'
	},
	gridColumns: {
		type: 'number',
		default: 3,
	}
}

export const registerStaticRelatedItemBlock = () => {
	/**
	 * Every block starts by registering a new block type definition.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
	 */
	registerBlockType( 'aib/static-related-items', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Static Related Items', 'search-with-algolia-instantsearch-blocks' ),

		/**
		 * This is a short description for your block, can be translated with `i18n` functions.
		 * It will be shown in the Block Tab in the Settings Sidebar.
		 */
		description: __(
			'現在の記事と関連性の高い記事リストを、記事内に保存できるブロックです。Staticに保存するため、記事更新時のみデータが更新されます。',
			'search-with-algolia-instantsearch-blocks'
		),

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'aib',

		/**
		 * An icon property should be specified to make it easier to identify a block.
		 * These can be any of WordPress’ Dashicons, or a custom svg element.
		 */
		icon: 'sticky',

		/**
		 * Optional block extended support features.
		 */
		supports: {
			// Removes support for an HTML mode.
			html: false,
		},
		attributes: initialAttributes,
		/**
		 * @see ./edit.js
		 */
		edit: Edit,

		save: Save,
	} );
}