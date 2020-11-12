import React from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { PoweredBy, Configure } from 'react-instantsearch-dom';
import { useEffect } from '@wordpress/element';

import {InspectorControls, BlockControls } from '@wordpress/block-editor'
import { HitItemVisibilityPanel } from '../../components/panel/HitItemVisibility';
import { HitItemContentPanel } from '../../components/panel/HitItemContent';
import { RelatedItemConfiguration } from '../../components/panel/RelatedItemConfig';
import { ListLayoutControl } from '../../components/blockControls/ListLayout';
import { AlgoliaInstantSearchWithClient } from '../../components/algolia/InstantSearch';
import { InstantSearchEditComponent } from './block.interfaces';
import  {ContainerHits} from './Frontend';
const { useEntityProp } = require('@wordpress/core-data');

export const Edit: InstantSearchEditComponent = (props ) => {
	const  { setAttributes, attributes }  = props;
	const { hitsItems, isUsingPaidPlan, appId, searchOnlyApiKey } = attributes
	const [algoliaSearchOnlyApiKey] = useEntityProp( 'root', 'site', 'aib_algolia_searchonly_api_key' )
	const [algoliaAppId] = useEntityProp( 'root', 'site', 'aib_algolia_app_id' )
	useEffect(() => {
		if (!!algoliaSearchOnlyApiKey && algoliaSearchOnlyApiKey !== searchOnlyApiKey) {
			setAttributes({
				searchOnlyApiKey: algoliaSearchOnlyApiKey
			})
		}
		if (!!algoliaAppId && algoliaAppId !== appId) {
			setAttributes({
				appId: algoliaAppId
			})
		}
	}, [setAttributes, appId, searchOnlyApiKey, algoliaSearchOnlyApiKey, algoliaAppId])

	return (
		<AlgoliaInstantSearchWithClient
			appId={algoliaAppId}
			searchOnlyAPIKey={algoliaSearchOnlyApiKey}
			indexName={props.attributes.indexName}
		>
			<InspectorControls>
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
			<ContainerHits attributes={attributes} />
			{isUsingPaidPlan ? null: <PoweredBy />}
		</AlgoliaInstantSearchWithClient>
	);
}

export default Edit