import { createElement, FC } from 'react';
import {render} from 'react-dom'
import { HitItemVisibleConfig } from './block.interfaces';
import { InstantsearchFrontend, InstantsearchFrontendProps} from './blocks/Instantsearch/Frontend'

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


function renderAllIfItemExists<Props = undefined>(elementClassName: string, element: FC<Props>): void {
    const targets = document.querySelectorAll<HTMLElement>(elementClassName)
    if (!targets) return;
    targets.forEach((target) => {
        const hitItem: HitItemVisibleConfig = {
            listLayout: target.getAttribute('data-list-layout') === 'grid' ? 'grid' : 'list',
            gridColumns: getNumberAttribute(target, 'data-grid-columns', 3),
            displayPostAuthor: getBooleanAttribute( target, 'data-display-post-author'),
            displayPostCategory: getBooleanAttribute( target, 'data-display-post-categories'),
            displayPostContentRadio: target.getAttribute('data-display-post-content-type') || 'excerpt',
            displayPostDate: getBooleanAttribute( target, 'data-display-post-date'),
            displayPostTags: getBooleanAttribute( target, 'data-display-post-tags'),
            excerptLength: getNumberAttribute(target, 'data-excerpt-length', 55)
        }
        const props: InstantsearchFrontendProps = {
            autoFocus: getBooleanAttribute( target, 'data-auto-focus'),
            appId: target.getAttribute('data-app-id') || undefined,
            apiKey: target.getAttribute('data-searchonly-api-key') || undefined,
            indexName: target.getAttribute('data-index-name') || 'wp_posts_post',
            hitsItems: getNumberAttribute(target, 'data-hit-items', 10),
            hitAttributes: hitItem,
            searchFormStyle: target.getAttribute('data-search-box-style') || undefined,
        }
        render(createElement(element, props as any), target)
    })
}
renderAllIfItemExists<InstantsearchFrontendProps>('.aib-instantsearch', InstantsearchFrontend)