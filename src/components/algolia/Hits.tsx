import React, { FC, useEffect } from 'react';
import classnames from 'classnames';
import { useHits } from 'react-instantsearch';
import { AlgoliaHit, HitItemVisibleConfig } from '../../block.interfaces';
import { StaticRelatedItemEditComponentProps as EditComponentProps } from '../../blocks/StaticRelatedItems/block.interfaces';
import { HitItem } from './HitItem';

/**
 * Renders the hit list.
 *
 * The class names (`ais-Hits`, `ais-Hits-list`, `ais-Hits-item`) are written as
 * plain strings on purpose: this markup is stored in post_content by the Static
 * Related Items block and must stay identical to what react-instantsearch-dom 6
 * produced, otherwise existing blocks become invalid.
 *
 * @param props
 * @param props.hits
 * @param props.attributes
 */
export const HitItems: FC< {
	hits: AlgoliaHit[];
	attributes: HitItemVisibleConfig;
} > = ( { hits, attributes } ) => {
	const { displayPostAuthor, displayPostDate, listLayout, gridColumns } =
		attributes;
	const listBlockClassName = classnames( {
		'wp-block-latest-posts': true,
		'wp-block-latest-posts__list': true,
		'is-grid': listLayout === 'grid',
		'has-dates': displayPostDate,
		'has-author': displayPostAuthor,
		'wp-block-archives': true,
		'ais-Hits-list': true,
		[ `columns-${ gridColumns }` ]: listLayout === 'grid',
	} );
	return (
		<div className="ais-Hits">
			<ul className={ listBlockClassName }>
				{ hits.map( ( hit ) => (
					<li className="ais-Hits-item" key={ hit.objectID }>
						<HitItem hit={ hit } attributes={ attributes } />
					</li>
				) ) }
			</ul>
		</div>
	);
};

/**
 * Live hits for the Static Related Items editor: shows the results and copies
 * them into the block attributes so they are saved with the post.
 *
 * @param props
 * @param props.setAttributes
 * @param props.attributes
 */
const ContainerHits: FC<
	Pick< EditComponentProps, 'setAttributes' | 'attributes' >
> = ( { setAttributes, attributes } ) => {
	const { items } = useHits< AlgoliaHit >();
	useEffect( () => {
		setAttributes( { hits: items } );
	}, [ setAttributes, items ] );
	return <HitItems hits={ items } attributes={ attributes } />;
};

export default ContainerHits;
