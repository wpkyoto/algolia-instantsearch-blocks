import React, { ComponentProps, FC, PropsWithChildren, useMemo } from 'react';
import { liteClient } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

export type SearchClient = ComponentProps<
	typeof InstantSearch
>[ 'searchClient' ];

/**
 * Response used when no request should reach Algolia
 * (missing credentials, or an empty query in the editor preview).
 *
 * @param requests Requests sent by InstantSearch.
 */
const emptyResults = ( requests: readonly unknown[] ) =>
	Promise.resolve( {
		results: requests.map( () => ( {
			hits: [],
			nbHits: 0,
			nbPages: 0,
			page: 0,
			processingTimeMS: 0,
			hitsPerPage: 0,
			exhaustiveNbHits: false,
			query: '',
			params: '',
		} ) ),
	} );

export const AlgoliaInstantSearch: FC<
	PropsWithChildren< {
		searchClient: SearchClient;
		indexName: string;
	} >
> = ( { children, searchClient, indexName } ) => (
	<InstantSearch
		searchClient={ searchClient }
		indexName={ indexName }
		// Do not load the Algolia Insights script from a CDN.
		insights={ false }
		future={ { preserveSharedStateOnUnmount: true } }
	>
		{ children }
	</InstantSearch>
);

export type AlgoliaInstantSearchClientProps = {
	searchOnlyAPIKey?: string;
	appId?: string;
	indexName: string;
	stopTheFirstRun?: boolean;
};

export const AlgoliaInstantSearchWithClient: FC<
	PropsWithChildren< AlgoliaInstantSearchClientProps >
> = ( { searchOnlyAPIKey, appId, indexName, children, stopTheFirstRun } ) => {
	const algoliaClient = useMemo( () => {
		if ( ! appId || ! searchOnlyAPIKey ) {
			return null;
		}
		return liteClient( appId, searchOnlyAPIKey );
	}, [ appId, searchOnlyAPIKey ] );
	const searchClient = useMemo( () => {
		if ( ! algoliaClient ) {
			return {
				search: ( requests: readonly unknown[] ) =>
					emptyResults( requests ),
			} as unknown as SearchClient;
		}
		return {
			...algoliaClient,
			search( requests: any ) {
				if (
					stopTheFirstRun &&
					requests.every( ( { params }: any ) => ! params?.query )
				) {
					return emptyResults( requests );
				}
				return algoliaClient.search( requests );
			},
		} as unknown as SearchClient;
	}, [ algoliaClient, stopTheFirstRun ] );
	return (
		<AlgoliaInstantSearch
			searchClient={ searchClient }
			indexName={ indexName }
		>
			{ children }
		</AlgoliaInstantSearch>
	);
};
