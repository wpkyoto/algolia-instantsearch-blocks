import React, { useMemo } from 'react'
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
/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import algoliasearch, { SearchClient } from 'algoliasearch'
import { CustomBlockAttributeSettings } from './block.interfaces';
import { AlgoliaInstantSearch } from './components/algolia/InstantSearch';
const { useEntityProp } = require('@wordpress/core-data');
const dummyClient = algoliasearch('XXX','XXXX')


const initialAttributes: CustomBlockAttributeSettings = {
	hits: {
		type: 'array'
	},
	categories: {
		type: 'array',
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


/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'aib/algolia-instantsearch-blocks', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Algolia Instantsearch Blocks', 'algolia-instantsearch-blocks' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Algolia Instantsearchの検索結果を記事に埋め込むブロックです。',
		'algolia-instantsearch-blocks'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'search',

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
	edit: (props) => {
		const [algoliaSearchOnlyApiKey] = useEntityProp( 'root', 'site', 'aib_algolia_searchonly_api_key' )
		const [algoliaAppId] = useEntityProp( 'root', 'site', 'aib_algolia_app_id' )
		const algoliaClient = useMemo(() => {
			if (!algoliaAppId || !algoliaSearchOnlyApiKey) return null;
			return algoliasearch(algoliaAppId,algoliaSearchOnlyApiKey)
		}, [algoliaAppId, algoliaSearchOnlyApiKey])
		const searchClient = useMemo(() => {
			if (!algoliaClient) {
				return {
					search(requests: any) {
						return Promise.resolve({
							results: requests.map(() => ({
							  hits: [],
							  nbHits: 0,
							  nbPages: 0,
							  page: 0,
							  processingTimeMS: 0,
							})),
						});
					}
				} as any as SearchClient
			}
			return {
				search(requests: any) {
					return algoliaClient.search(requests)
				}
			} as SearchClient
		}, [algoliaClient])
		return (
			<AlgoliaInstantSearch
				searchClient={searchClient}
				indexName={props.attributes.indexName}
			>
				<Edit {...props} />
			</AlgoliaInstantSearch>
		)
	},

	save: (props) => {
		return (
			<AlgoliaInstantSearch
				searchClient={dummyClient}
				indexName={"dummy"}
			>
				<Save {...props} />
			</AlgoliaInstantSearch>
		)
	},
} );