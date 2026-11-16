import React, { FC } from 'react';
import { Configure, PoweredBy, Stats, useHits } from 'react-instantsearch';
import { AlgoliaHit, HitItemVisibleConfig } from '../../block.interfaces';
import { HitItems } from '../../components/algolia/Hits';
import { AlgoliaInstantSearchWithClient } from '../../components/algolia/InstantSearch';
import { SearchBox } from '../../components/algolia/SearchForm';

export type InstantsearchFrontendProps = {
	appId?: string;
	apiKey?: string;
	indexName?: string;
	hitsItems?: number;
	hitAttributes: HitItemVisibleConfig;
	searchFormStyle?: string;
	autoFocus?: boolean;
};

export const ContainerHits: FC< { attributes: HitItemVisibleConfig } > = ( {
	attributes,
} ) => {
	const { items } = useHits< AlgoliaHit >();
	return <HitItems hits={ items } attributes={ attributes } />;
};

export const InstantsearchFrontend: FC< InstantsearchFrontendProps > = ( {
	appId,
	apiKey,
	indexName,
	hitsItems,
	hitAttributes,
	searchFormStyle,
	autoFocus,
} ) => {
	if ( ! apiKey || ! appId || ! indexName ) {
		return null;
	}
	return (
		<AlgoliaInstantSearchWithClient
			searchOnlyAPIKey={ apiKey }
			appId={ appId }
			indexName={ indexName }
		>
			<Configure hitsPerPage={ hitsItems } />
			<SearchBox
				ui={ searchFormStyle === 'algolia' ? 'algolia' : 'wordpress' }
				focusOnLoad={ autoFocus }
			/>
			<Stats
				translations={ {
					rootElementText: ( { nbHits } ) =>
						`${ nbHits } results found`,
				} }
			/>
			<ContainerHits attributes={ hitAttributes } />
			<PoweredBy />
		</AlgoliaInstantSearchWithClient>
	);
};
