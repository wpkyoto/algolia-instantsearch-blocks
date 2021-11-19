import React, {createElement, FC } from 'react'
import { Configure, connectHits, PoweredBy, Stats} from 'react-instantsearch-dom';
import { AlgoliaHit, HitItemVisibleConfig } from '../../block.interfaces';
import { HitItems } from '../../components/algolia/Hits';
import { AlgoliaInstantSearchWithClient } from '../../components/algolia/InstantSearch';
import { SearchBox } from '../../components/algolia/SearchForm'

type Props = {
    attributes: HitItemVisibleConfig
}

export type InstantsearchFrontendProps = {
    appId?: string;
    apiKey?: string;
    indexName?: string;
    hitsItems?: number;
    hitAttributes: HitItemVisibleConfig;
    searchFormStyle?: string;
    autoFocus?: boolean;
}

export const InstantsearchFrontend: FC<InstantsearchFrontendProps> = ({
    appId,
    apiKey,
    indexName,
    hitsItems,
    hitAttributes,
    searchFormStyle,
    autoFocus,
}) => {
    if (!apiKey || !appId || !indexName) {
        return null;
    }
    return (
        <AlgoliaInstantSearchWithClient
            searchOnlyAPIKey={apiKey}
            appId={appId}
            indexName={indexName}
        >
            <Configure
                hitsPerPage={hitsItems}
            />
            <SearchBox
                ui={searchFormStyle === 'algolia' ? 'algolia' : 'wordpress'}
                autoFocus={autoFocus}    
            />
            <Stats
                translations={{
                    stats(nbHits) {
                        return `${nbHits} results found`
                    }
                }}
            />
            <ContainerHits
                attributes={hitAttributes}
            />
            <PoweredBy />
        </AlgoliaInstantSearchWithClient>
    )
}

export const ContainerHits: FC<Props> = ({attributes}) => {
    const hit = connectHits<AlgoliaHit>(({hits}) => {
        return (
            <HitItems
                hits={hits}
                attributes={attributes}
            />
        )
    })
    return createElement(hit)
}