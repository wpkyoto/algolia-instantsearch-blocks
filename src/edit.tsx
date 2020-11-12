import React from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from 'react'
import { 
	PoweredBy, ExperimentalConfigureRelatedItems, Configure
} from 'react-instantsearch-dom';

import {InspectorControls, BlockControls } from '@wordpress/block-editor'
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { EditComponent } from './block.interfaces';
import { useCurrentPostCategories, useCurrentPostTags } from './hooks/PostAttributes';
import WPHits from './components/algolia/Hits'
import { SearchOption } from './components/panel/SearchOptions';
import { HitItemVisibilityPanel } from './components/panel/HitItemVisibility';
import { HitItemContentPanel } from './components/panel/HitItemContent';
import { RelatedItemConfiguration } from './components/panel/RelatedItemConfig';
import { ListLayoutControl } from './components/blockControls/ListLayout';
import { AlgoliaInstantSearchWithClient } from './components/algolia/InstantSearch';
const { useEntityProp } = require('@wordpress/core-data');

export const Edit: EditComponent = (props ) => {
	const  { setAttributes, attributes }  = props;
	const {
		enableExperimentalRelatedItems, hitsItems,
		categoryScore, postTitleScore, tagScore,
	} = attributes

	const categories = useCurrentPostCategories()
	const tags = useCurrentPostTags()
	const postTitle = useSelect(select => select('core/editor').getEditedPostAttribute('title'))
	useEffect(() => {
		setAttributes({categories})
	}, [categories, setAttributes])

	const transformSearchParameters = useCallback(param => {
		if (categoryScore > 0) {
			categories.forEach(category => {
				param.optionalFilters.push(`taxonomies.category:${category.name}<score=${categoryScore}>`)
			})
		}
		if (tagScore > 0) {
			tags.forEach(tag => {
				param.optionalFilters.push(`taxonomies.post_tag:${tag.name}<score=${tagScore}>`)
			})
		}
		return param
	}, [categories, tags, categoryScore, tagScore])
	const { isUsingPaidPlan } = attributes
	const [algoliaSearchOnlyApiKey] = useEntityProp( 'root', 'site', 'aib_algolia_searchonly_api_key' )
	const [algoliaAppId] = useEntityProp( 'root', 'site', 'aib_algolia_app_id' )

	return (
		<AlgoliaInstantSearchWithClient
			appId={algoliaAppId}
			searchOnlyAPIKey={algoliaSearchOnlyApiKey}
			indexName={props.attributes.indexName}
		>
			<InspectorControls>
				<SearchOption {...props} />
				<HitItemVisibilityPanel {...props} />
				<HitItemContentPanel {...props} />
				<RelatedItemConfiguration {...props} />
			</InspectorControls>
			<BlockControls>
				<ListLayoutControl {...props} />
			</BlockControls>
			<Configure
				hitsPerPage={hitsItems}
			/>
			{enableExperimentalRelatedItems ? (
				<ExperimentalConfigureRelatedItems
					hit={{
						post_title: postTitle ||  ''
					}}
					matchingPatterns={{
						post_title: {
							score: postTitleScore
						},
					}}
					transformSearchParameters={transformSearchParameters}
				/>
			): null}
			{/* @ts-expect-error */}
			<WPHits setAttributes={setAttributes} attributes={attributes} />
			{isUsingPaidPlan ? null: <PoweredBy />}
		</AlgoliaInstantSearchWithClient>
	);
}

export default Edit