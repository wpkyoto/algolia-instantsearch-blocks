import React, {FC, useCallback, useMemo, useState} from 'react'
import { connectSearchBox, SearchBox as AlgoliaSearchBox} from 'react-instantsearch-dom'

export const WordPressStyledSearchBox = connectSearchBox(({currentRefinement, refine, ...props }) => {
    const autoFocus = (props as any).autoFocus || false
    const [searchWord, updateSearchWord] = useState(currentRefinement)
    const handleSubmit = useCallback((event) => {
        event.preventDefault()
        refine(searchWord)
    }, [refine, searchWord])
    const handleOnChange = useCallback((event) => {
        updateSearchWord(event.currentTarget.value)
    }, [updateSearchWord])
    return (
            <form role="search" className="search-form" onSubmit={handleSubmit}>
                <label>
                    <span className="screen-reader-text">Search for:</span>
                    <input
                        type="search"
                        className="search-field"
                        placeholder="Search"
                        value={searchWord}
                        onChange={handleOnChange}
                        name="s"
                        autoFocus={autoFocus}
                    />
                </label>
                <input type="submit" className="search-submit" value="Search" />
            </form>
        )
    }
)

export const SearchBox: FC<{
    ui?: 'algolia' | 'wordpress'
    autoFocus?: boolean;
}> = (props) => {
    if (props.ui === 'algolia') return <AlgoliaSearchBox {...props} />
    return <WordPressStyledSearchBox {...props} />
}
