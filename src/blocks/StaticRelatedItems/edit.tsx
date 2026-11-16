import React from 'react';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { PoweredBy, Configure } from 'react-instantsearch';
import { useEntityProp } from '@wordpress/core-data';

import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import WPHits from '../../components/algolia/Hits';
import { SearchOption } from './components/SearchOptions';
import { HitItemVisibilityPanel } from '../../components/panel/HitItemVisibility';
import { HitItemContentPanel } from '../../components/panel/HitItemContent';
import { RelatedItemConfiguration } from '../../components/panel/RelatedItemConfig';
import { ListLayoutControl } from '../../components/blockControls/ListLayout';
import { AlgoliaInstantSearchWithClient } from '../../components/algolia/InstantSearch';
import ExperimentalRelatedItems from '../../components/algolia/ExperimentalRelatedItems';
import { StaticRelatedItemEditComponent } from './block.interfaces';

export const Edit: StaticRelatedItemEditComponent = ( props ) => {
	const { setAttributes, attributes } = props;
	const { hitsItems, isUsingPaidPlan } = attributes;
	const [ algoliaSearchOnlyApiKey ] = useEntityProp(
		'root',
		'site',
		'aib_algolia_searchonly_api_key'
	) as [ string | undefined, unknown, unknown ];
	const [ algoliaAppId ] = useEntityProp(
		'root',
		'site',
		'aib_algolia_app_id'
	) as [ string | undefined, unknown, unknown ];

	return (
		<AlgoliaInstantSearchWithClient
			appId={ algoliaAppId }
			searchOnlyAPIKey={ algoliaSearchOnlyApiKey }
			indexName={ props.attributes.indexName }
		>
			<InspectorControls>
				<SearchOption { ...props } />
				<HitItemVisibilityPanel { ...props } />
				<HitItemContentPanel { ...props } />
				<RelatedItemConfiguration { ...props } />
			</InspectorControls>
			<BlockControls group="block">
				<ListLayoutControl { ...props } />
			</BlockControls>
			<Configure hitsPerPage={ hitsItems } />
			<ExperimentalRelatedItems { ...props } />
			<WPHits setAttributes={ setAttributes } attributes={ attributes } />
			{ isUsingPaidPlan ? null : <PoweredBy /> }
		</AlgoliaInstantSearchWithClient>
	);
};

export default Edit;
