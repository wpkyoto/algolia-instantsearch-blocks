import { useMemo } from 'react';
import { useSelect } from '@wordpress/data';

type Term = { id: number; name: string };

const useCurrentPostTerms = (
	postAttribute: 'categories' | 'tags',
	taxonomy: 'category' | 'post_tag'
): Term[] => {
	const termIds: number[] | undefined = useSelect(
		( select ) =>
			( select( 'core/editor' ) as any )?.getEditedPostAttribute?.(
				postAttribute
			),
		[ postAttribute ]
	);
	const terms: Term[] | null = useSelect(
		( select ) =>
			( select( 'core' ) as any ).getEntityRecords(
				'taxonomy',
				taxonomy,
				{
					per_page: -1,
				}
			),
		[ taxonomy ]
	);
	return useMemo( () => {
		if ( ! terms || ! Array.isArray( termIds ) ) {
			return [];
		}
		return terms.filter( ( term ) => termIds.includes( term.id ) );
	}, [ terms, termIds ] );
};

export const useCurrentPostCategories = () =>
	useCurrentPostTerms( 'categories', 'category' );

export const useCurrentPostTags = () =>
	useCurrentPostTerms( 'tags', 'post_tag' );
