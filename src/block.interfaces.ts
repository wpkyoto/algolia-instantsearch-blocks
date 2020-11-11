import { FC } from 'react'
import { BlockAttribute, BlockEditProps, BlockSaveProps } from '@wordpress/blocks';
import { Hit } from 'react-instantsearch-core';

export type AlgoliaWPPost = {
    post_title: string;
    content: string;
    permalink: string;
    post_date: string;
    post_date_formatted: string;
    post_id: number;
    post_type: string;
	post_type_label: string;
	post_excerpt: string;
    taxonomies: {
        category: string[];
        post_tag: string[]
	}
	post_author: {
		display_name: string;
		user_id: number;
		user_login: string;
		user_url: string;
	}
}
export type AlgoliaHit = Hit<AlgoliaWPPost>

export type CustomBlockAttributeSettings = {
	readonly hits: BlockAttribute<any>;
	readonly categories: BlockAttribute<any>;
	readonly indexName: BlockAttribute<any>;
	readonly displaySearchForm: BlockAttribute<any>;
	readonly displayPostDate: BlockAttribute<any>;
	readonly displayPostAuthor: BlockAttribute<any>;
	readonly displayPostCategory: BlockAttribute<any>;
	readonly displayPostTags: BlockAttribute<any>;
	readonly isUsingPaidPlan: BlockAttribute<any>;
	readonly displayPostContentRadio: BlockAttribute<any>;
	readonly excerptLength: BlockAttribute<any>;
	readonly enableExperimentalRelatedItems: BlockAttribute<any>;
	readonly categoryScore: BlockAttribute<any>;
	readonly tagScore: BlockAttribute<any>;
	readonly postTitleScore: BlockAttribute<any>;
	readonly hitsItems: BlockAttribute<any>;
	readonly listLayout: BlockAttribute<any>;
	readonly gridColumns: BlockAttribute<any>;
}
export type CustomBlockAttributes = {
	readonly hits?: Array<AlgoliaHit>
	readonly categories?:Array<{
		name: string;
		id: number;
	}>
	readonly indexName: string;
	readonly displaySearchForm: boolean;
	readonly isUsingPaidPlan: boolean;
	readonly displayPostDate: boolean;
	readonly displayPostAuthor: boolean;
	readonly displayPostCategory: boolean;
	readonly displayPostTags: boolean;
	readonly displayPostContentRadio: string;
	readonly excerptLength: number;
	readonly enableExperimentalRelatedItems: boolean;
	readonly categoryScore: number;
	readonly tagScore: number;
	readonly postTitleScore: number;
	readonly hitsItems: number;
	readonly listLayout: 'grid' | 'list';
	readonly gridColumns: number;
}
export type RelatedItemScoreAttribuets = 'categoryScore'
| 'tagScore'
| 'postTitleScore'
export type HitItemVisibleAttributes = 'displayPostAuthor'
| 'displayPostCategory'
| 'displayPostDate'
| 'displayPostTags'
| 'displayPostContentRadio'
| 'excerptLength'
| 'listLayout'
| 'gridColumns'

export type HitItemVisibleConfig = Pick<CustomBlockAttributes, HitItemVisibleAttributes>
export type EditComponentProps = BlockEditProps<CustomBlockAttributes>
export type SaveComponentProps = BlockSaveProps<CustomBlockAttributes>
export type EditComponent = FC<EditComponentProps>
export type SaveComponent = FC<SaveComponentProps>