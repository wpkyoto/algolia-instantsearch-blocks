import React, {FC, useCallback, useMemo, useState} from 'react'
import { connectSearchBox, SearchBox as AlgoliaSearchBox} from 'react-instantsearch-dom'

export const WordPressStyledSearchBox = connectSearchBox(({currentRefinement, refine }) => {
    const [tmpSearchWord, updateSearchWord] = useState('')
    const searchWord = useMemo(() => {
        if (!tmpSearchWord) return currentRefinement
        return tmpSearchWord
    }, [tmpSearchWord, currentRefinement])
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
                    />
                </label>
                <input type="submit" className="search-submit" value="Search" />
            </form>
        )
    }
)

export const SearchBox: FC<{
    ui?: 'algolia' | 'wordpress'
}> = (props) => {
    if (props.ui === 'algolia') return <AlgoliaSearchBox />
    return <WordPressStyledSearchBox />
}
