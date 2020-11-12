import { createElement, FC } from 'react';
import {render} from 'react-dom'
import { InstantsearchFrontend} from './blocks/Instantsearch/Frontend'

function renderIfItemExists<Props = undefined>(elementId: string, element: FC<Props>, props?: Props): void {
    const target = document.getElementById(elementId)
    if (target) {
        render(createElement(element, props), target)
    }
}
renderIfItemExists('aib-instantsearch', InstantsearchFrontend)