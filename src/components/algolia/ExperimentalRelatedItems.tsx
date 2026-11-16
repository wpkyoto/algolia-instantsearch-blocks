import { useMemo } from 'react';
import { useConfigure } from 'react-instantsearch';
import { useSelect } from '@wordpress/data';

import {
	useCurrentPostCategories,
	useCurrentPostTags,
} from '../../hooks/PostAttributes';
import { GeneralEditComponent } from '../../block.interfaces';

/**
 * Boosts posts that share the title, categories and tags of the post being edited.
 *
 * React InstantSearch v7 has no `ExperimentalConfigureRelatedItems` widget, so this
 * builds the same search parameters that widget produced (`sumOrFiltersScores`
 * plus scored `optionalFilters`) and applies them with `useConfigure`.
 *
 * @param props Block edit props.
 */
export const ExperimentalRelatedItems: GeneralEditComponent = ( props ) => {
	const { attributes } = props;
	const {
		enableExperimentalRelatedItems,
		categoryScore,
		postTitleScore,
		tagScore,
	} = attributes;

	const categories = useCurrentPostCategories();
	const tags = useCurrentPostTags();
	const postTitle: string = useSelect(
		( select ) =>
			( select( 'core/editor' ) as any )?.getEditedPostAttribute?.(
				'title'
			),
		[]
	);

	const searchParameters = useMemo( () => {
		if ( ! enableExperimentalRelatedItems ) {
			return {};
		}
		const optionalFilters: string[] = [];
		if ( postTitle ) {
			optionalFilters.push(
				`post_title:${ postTitle }<score=${ postTitleScore || 1 }>`
			);
		}
		if ( categoryScore > 0 ) {
			categories.forEach( ( category ) => {
				optionalFilters.push(
					`taxonomies.category:${ category.name }<score=${ categoryScore }>`
				);
			} );
		}
		if ( tagScore > 0 ) {
			tags.forEach( ( tag ) => {
				optionalFilters.push(
					`taxonomies.post_tag:${ tag.name }<score=${ tagScore }>`
				);
			} );
		}
		return {
			sumOrFiltersScores: true,
			optionalFilters,
		};
	}, [
		enableExperimentalRelatedItems,
		postTitle,
		postTitleScore,
		categories,
		tags,
		categoryScore,
		tagScore,
	] );

	useConfigure( searchParameters );
	return null;
};

export default ExperimentalRelatedItems;
