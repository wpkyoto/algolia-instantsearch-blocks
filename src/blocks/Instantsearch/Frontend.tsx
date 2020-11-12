import React, {createElement, FC, useMemo} from 'react'
import { Configure, connectHits, PoweredBy, Stats} from 'react-instantsearch-dom';
import { AlgoliaHit, HitItemVisibleConfig } from '../../block.interfaces';
import { HitItems } from '../../components/algolia/Hits';
import { AlgoliaInstantSearchWithClient } from '../../components/algolia/InstantSearch';
import { SearchBox } from '../../components/algolia/SearchForm'

type Props = {
    attributes: HitItemVisibleConfig
}

const getNumberAttribute = (element: HTMLElement, attributeName: string, fallback = 0): number => {
    const attribute = element.getAttribute(attributeName)
    if (!attribute) return fallback
    return Number(attribute)
}
const getBooleanAttribute = (element: HTMLElement, attributeName: string, fallback = false): boolean => {
    const attribute = element.getAttribute(attributeName)
    if (!attribute) return fallback
    return attribute === 'true'
}


export const InstantsearchFrontend: FC = () => {
    const rootElement = document.getElementById('aib-instantsearch')
    if (!rootElement) return null;
    const {
        appId,
        apiKey,
        indexName,
        hitsItems,
        hitAttributes,
    } = useMemo(() => {
        const hitItem: HitItemVisibleConfig = {
            listLayout: rootElement.getAttribute('data-list-layout') === 'grid' ? 'grid' : 'list',
            gridColumns: getNumberAttribute(rootElement, 'data-grid-columns', 3),
            displayPostAuthor: getBooleanAttribute( rootElement, 'data-display-post-author'),
            displayPostCategory: getBooleanAttribute( rootElement, 'data-display-post-categories'),
            displayPostContentRadio: rootElement.getAttribute('data-display-post-content-type') || 'excerpt',
            displayPostDate: getBooleanAttribute( rootElement, 'data-display-post-date'),
            displayPostTags: getBooleanAttribute( rootElement, 'data-display-post-tags'),
            excerptLength: getNumberAttribute(rootElement, 'data-excerpt-length', 55)
        }
        return {
            appId: rootElement.getAttribute('data-app-id'),
            apiKey: rootElement.getAttribute('data-searchonly-api-key'),
            indexName: rootElement.getAttribute('data-index-name') || 'wp_posts_post',
            hitsItems: getNumberAttribute(rootElement, 'data-hit-items', 10),
            hitAttributes: hitItem,
        }
    }, [rootElement])
    if (!apiKey || !appId) {
        return null;
    }
    const searchFormStyle = rootElement.getAttribute('data-search-box-style') === 'algolia' ? 'algolia' : 'wordpress' as const
    return (
        <AlgoliaInstantSearchWithClient
            searchOnlyAPIKey={apiKey}
            appId={appId}
            indexName={indexName}
        >
            <Configure
                hitsPerPage={hitsItems}
            />
            <SearchBox ui={searchFormStyle} />
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