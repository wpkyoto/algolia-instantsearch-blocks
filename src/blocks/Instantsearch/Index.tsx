import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { InstantSearchAttributeSettings } from './block.interfaces';
import Edit from './Edit';
import { Save } from './Save';

const initialAttributes: InstantSearchAttributeSettings = {
	indexName: {
		type: 'string',
		default: 'wp_posts_post'
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
	},
    searchOnlyApiKey: {
        type: 'string',
    },
    appId: {
        type: 'string',
    },
    searchFormStyle: {
        type: 'string',
        default: 'wordpress'
    },
	autoFocus: {
		type: 'boolean',
		default: false,
	}
}

export const registerInstantsearchBlock = () => {
    registerBlockType( 'aib/instantsearch', {
        title: __( 'Instantsearch', 'search-with-algolia-instantsearch-blocks' ),
        description: __(
            'Show Algolia Instantsearch form and the results',
            'search-with-algolia-instantsearch-blocks'
        ),
        category: 'aib',
        icon: 'search',
        supports: {
            html: false,
        },
        attributes: initialAttributes,
        edit: Edit,
        save: Save
    })
}