import React, { FC, PropsWithChildren, ReactNode, useMemo } from 'react'
import algoliasearch, {SearchClient} from 'algoliasearch'
import { InstantSearch } from 'react-instantsearch-dom';

export const AlgoliaInstantSearch: FC<PropsWithChildren<{
    searchClient: SearchClient
    indexName: string;
}>> = ({children, searchClient, indexName}) => {
	return (
		<InstantSearch
			searchClient={searchClient}
			indexName={indexName}
		>
			{children}
		</InstantSearch>
	)
}

export type AlgoliaInstantSearchClientProps = {
	searchOnlyAPIKey?: string;
	appId?: string;
	indexName: string;
	stopTheFirstRun?: boolean;
}

export const AlgoliaInstantSearchWithClient: FC<PropsWithChildren<AlgoliaInstantSearchClientProps>> = ({
	searchOnlyAPIKey, appId, indexName, children, stopTheFirstRun
}) => {
	const algoliaClient = useMemo(() => {
		if (!appId || !searchOnlyAPIKey) return null;
		return algoliasearch(appId,searchOnlyAPIKey)
	}, [appId, searchOnlyAPIKey])
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
				if (stopTheFirstRun && requests.every(({ params }: any) => !params.query)) {
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
				return algoliaClient.search(requests)
			}
		} as SearchClient
	}, [algoliaClient])
	return (<AlgoliaInstantSearch searchClient={searchClient} indexName={indexName}>{children}</AlgoliaInstantSearch>)
}

const dummyClient = algoliasearch('XXX','XXXX')
export const AlgoliaDummyInstantSearchClient: FC<{
	children: ReactNode
}> = ({children}) =>  (
	<AlgoliaInstantSearch
		searchClient={dummyClient}
		indexName={"dummy"}
	>
		{children}
	</AlgoliaInstantSearch>
)