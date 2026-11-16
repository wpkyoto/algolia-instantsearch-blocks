import React from 'react';
import { HitItems } from '../../components/algolia/Hits';
import { LegacyPoweredBy } from '../../components/algolia/LegacyPoweredBy';
import { StaticRelatedItemSaveComponent } from './block.interfaces';

/**
 * Saves the related posts as static HTML.
 *
 * The output must stay byte-identical to version 0.2.0 (which used
 * react-instantsearch-dom 6). It does not use React InstantSearch at all:
 * there is no search at render time, only stored hits.
 *
 * @param props Block save props.
 */
export const Save: StaticRelatedItemSaveComponent = ( props ) => {
	const { attributes } = props;
	const { isUsingPaidPlan } = attributes;
	const hits = attributes.hits || [];
	return (
		<>
			<HitItems hits={ hits } attributes={ attributes } />
			{ isUsingPaidPlan ? null : <LegacyPoweredBy /> }
		</>
	);
};

export default Save;
