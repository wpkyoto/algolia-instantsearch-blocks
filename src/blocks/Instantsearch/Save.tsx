import React  from 'react'
import { InstantSearchSaveComponent } from './block.interfaces'


export const Save: InstantSearchSaveComponent =  ({
    attributes: {
        appId,
        searchOnlyApiKey,
        listLayout,
        gridColumns,
        indexName,
        displayPostAuthor,
        displayPostCategory,
        displayPostContentRadio,
        displayPostDate,
        displayPostTags,
        excerptLength,
        enableExperimentalRelatedItems,
        categoryScore,
        postTitleScore,
        tagScore,
        searchFormStyle,
        hitsItems,
        autoFocus,
    }
}) => (
    <div
        className="aib-instantsearch"
        data-app-id={appId}
        data-searchonly-api-key={searchOnlyApiKey}
        data-list-layout={listLayout}
        data-grid-columns={gridColumns}
        data-index-name={indexName}
        data-display-post-author={displayPostAuthor}
        data-display-post-categories={displayPostCategory}
        data-display-post-content-type={displayPostContentRadio}
        data-display-post-date={displayPostDate}
        data-display-post-tags={displayPostTags}
        data-excerpt-length={excerptLength}
        data-enable-experimental-related-items={enableExperimentalRelatedItems}
        data-category-score={categoryScore}
        data-post-title-score={postTitleScore}
        data-tag-score={tagScore}
        data-search-box-style={searchFormStyle}
        data-hit-items={hitsItems}
        data-auto-focus={autoFocus}
    />
)