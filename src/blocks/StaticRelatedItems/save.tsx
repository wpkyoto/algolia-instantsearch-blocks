import React from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { PoweredBy } from 'react-instantsearch-dom';
import { HitItems } from '../../components/algolia/Hits';
import { AlgoliaDummyInstantSearchClient } from '../../components/algolia/InstantSearch';
import { StaticRelatedItemSaveComponent } from './block.interfaces';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export const Save:StaticRelatedItemSaveComponent = (props) => {
	const { attributes } = props;
	const { isUsingPaidPlan } = attributes
	const hits = props.attributes.hits || []
	return (
		<AlgoliaDummyInstantSearchClient>
			<HitItems hits={hits} attributes={attributes} /> 
			{isUsingPaidPlan ? null : <PoweredBy />}
			</AlgoliaDummyInstantSearchClient>
	);
}

export default Save
