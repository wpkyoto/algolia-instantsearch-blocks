import { FC } from 'react'
import { BlockEditProps, BlockSaveProps, BlockAttribute } from '@wordpress/blocks';
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
export type CustomBlockAttribute = BlockAttribute<any>

export type PostDisplaySettingAttributes = {
	readonly listLayout: CustomBlockAttribute;
	readonly gridColumns: CustomBlockAttribute;
	readonly displayPostDate: CustomBlockAttribute;
	readonly displayPostAuthor: CustomBlockAttribute;
	readonly displayPostCategory: CustomBlockAttribute;
	readonly displayPostTags: CustomBlockAttribute;
	readonly isUsingPaidPlan: CustomBlockAttribute;
	readonly displayPostContentRadio: CustomBlockAttribute;
	readonly excerptLength: CustomBlockAttribute;
}
export type PostDisplayAttributes = {
	readonly listLayout: 'grid' | 'list';
	readonly gridColumns: number;
	readonly displayPostDate: boolean;
	readonly displayPostAuthor: boolean;
	readonly displayPostCategory: boolean;
	readonly displayPostTags: boolean;
	readonly displayPostContentRadio: string;
	readonly excerptLength: number;
	readonly isUsingPaidPlan: boolean;
}

export type AlgoliaSearchSettingAttributes = {
	readonly indexName: CustomBlockAttribute;
	readonly enableExperimentalRelatedItems: CustomBlockAttribute;
	readonly categoryScore: CustomBlockAttribute;
	readonly tagScore: CustomBlockAttribute;
	readonly postTitleScore: CustomBlockAttribute;
	readonly hitsItems: CustomBlockAttribute;
	readonly autoFocus: CustomBlockAttribute;
}
export type AlgoliaSearchAttributes = {
	readonly indexName: string;
	readonly enableExperimentalRelatedItems: boolean;
	readonly categoryScore: number;
	readonly tagScore: number;
	readonly postTitleScore: number;
	readonly hitsItems: number;
	readonly autoFocus?: boolean;
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

export type HitItemVisibleConfig = Pick<PostDisplayAttributes & AlgoliaSearchAttributes, HitItemVisibleAttributes>

export type GeneralAttributeSettings = PostDisplaySettingAttributes
export type GeneralAttributes = PostDisplayAttributes & AlgoliaSearchAttributes
export type GeneralEditComponentProps = BlockEditProps<GeneralAttributes>
export type GeneralSaveComponentProps = BlockSaveProps<GeneralAttributes>
export type GeneralEditComponent = FC<GeneralEditComponentProps>
export type GeneralSaveComponent = FC<GeneralSaveComponentProps>