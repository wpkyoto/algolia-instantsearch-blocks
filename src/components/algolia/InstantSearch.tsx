import React, { FC, PropsWithChildren } from 'react'
import {SearchClient} from 'algoliasearch'
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