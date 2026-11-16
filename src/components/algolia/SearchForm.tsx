import React, { FC, useCallback, useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
	SearchBox as AlgoliaSearchBox,
	useSearchBox,
} from 'react-instantsearch';

export const WordPressStyledSearchBox: FC< { focusOnLoad?: boolean } > = ( {
	focusOnLoad = false,
} ) => {
	const { query, refine } = useSearchBox();
	const [ searchWord, updateSearchWord ] = useState( query );
	useEffect( () => {
		updateSearchWord( query );
	}, [ query ] );
	const handleSubmit = useCallback(
		( event: React.FormEvent< HTMLFormElement > ) => {
			event.preventDefault();
			refine( searchWord );
		},
		[ refine, searchWord ]
	);
	const handleOnChange = useCallback(
		( event: React.ChangeEvent< HTMLInputElement > ) => {
			updateSearchWord( event.currentTarget.value );
		},
		[ updateSearchWord ]
	);
	return (
		<form role="search" className="search-form" onSubmit={ handleSubmit }>
			{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control -- the input is nested in the label. */ }
			<label>
				<span className="screen-reader-text">
					{ __(
						'Search for:',
						'search-with-algolia-instantsearch-blocks'
					) }
				</span>
				<input
					type="search"
					className="search-field"
					placeholder={ __(
						'Search',
						'search-with-algolia-instantsearch-blocks'
					) }
					value={ searchWord }
					onChange={ handleOnChange }
					name="s"
					// eslint-disable-next-line jsx-a11y/no-autofocus -- opt-in block setting.
					autoFocus={ focusOnLoad }
				/>
			</label>
			<input
				type="submit"
				className="search-submit"
				value={ __(
					'Search',
					'search-with-algolia-instantsearch-blocks'
				) }
			/>
		</form>
	);
};

export const SearchBox: FC< {
	ui?: 'algolia' | 'wordpress';
	focusOnLoad?: boolean;
} > = ( { ui, focusOnLoad } ) => {
	if ( ui === 'algolia' ) {
		// eslint-disable-next-line jsx-a11y/no-autofocus -- opt-in block setting.
		return <AlgoliaSearchBox autoFocus={ focusOnLoad } />;
	}
	return <WordPressStyledSearchBox focusOnLoad={ focusOnLoad } />;
};
