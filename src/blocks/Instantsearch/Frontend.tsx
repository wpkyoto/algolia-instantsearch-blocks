import React, {createElement, FC, useMemo} from 'react'
import { connectHits, PoweredBy, SearchBox } from 'react-instantsearch-dom';
import { AlgoliaHit, HitItemVisibleConfig } from '../../block.interfaces';
import { HitItems } from '../../components/algolia/Hits';
import { AlgoliaInstantSearchWithClient } from '../../components/algolia/InstantSearch';

type Props = {
    attributes: HitItemVisibleConfig
}

export const InstantsearchFrontend: FC = () => {
    const rootElement = document.getElementById('aib-instantsearch')
    if (!rootElement) return null;
    const {
        appId,
        apiKey,
        indexName,
        hitAttributes,
    } = useMemo(() => {
        const hitItem: HitItemVisibleConfig = {
            listLayout: rootElement.getAttribute('data-list-layout') === 'grid' ? 'grid' : 'list',
            gridColumns: rootElement.getAttribute('data-grid-columns') ? Number(rootElement.getAttribute('data-grid-columns')) : 3,
            displayPostAuthor: rootElement.getAttribute('data-display-post-author') === 'true',
            displayPostCategory: rootElement.getAttribute('data-display-post-categories') === 'true',
            displayPostContentRadio: rootElement.getAttribute('data-display-post-content-type') || 'excerpt',
            displayPostDate: rootElement.getAttribute('data-display-post-date') === 'true',
            displayPostTags: rootElement.getAttribute('data-display-post-tags') === 'true',
            excerptLength: rootElement.getAttribute('data-excerpt-length') ? Number(rootElement.getAttribute('data-excerpt-length')) : 55
        }
        return {
            appId: rootElement.getAttribute('data-app-id'),
            apiKey: rootElement.getAttribute('data-searchonly-api-key'),
            indexName: rootElement.getAttribute('data-index-name') || 'wp_posts_post',
            hitAttributes: hitItem
        }
    }, [rootElement])
    if (!apiKey || !appId) {
        return null;
    }
    return (
        <div>
            <h1>Hello Instantsearch block</h1>
            <AlgoliaInstantSearchWithClient
                searchOnlyAPIKey={apiKey}
                appId={appId}
                indexName={indexName}
            >
                <SearchBox />
                <ContainerHits
                    attributes={hitAttributes}
                />
                <PoweredBy />
            </AlgoliaInstantSearchWithClient>
        </div>
    )
}

export const ContainerHits: FC<Props> = ({attributes}) => {
    const hit = connectHits<AlgoliaHit>(({hits}) => {
        console.log(attributes)
        return (
            <HitItems
                hits={hits}
                attributes={attributes}
            />
        )
    })
    return createElement(hit)
}