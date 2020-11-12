import React , {FC} from 'react'
import { __ } from '@wordpress/i18n';
import {
    connectHits,
	createClassNames,
} from 'react-instantsearch-dom';
import classNames from 'classnames';
import { useEffect } from '@wordpress/element';
import { AlgoliaHit, HitItemVisibleConfig } from '../../block.interfaces';
import { StaticRelatedItemEditComponentProps as EditComponentProps } from '../../blocks/StaticRelatedItems/block.interfaces';
import { HitItem } from './HitItem';
import classnames from 'classnames';

export const HitItems: FC<{
    hits: AlgoliaHit[];
	attributes: HitItemVisibleConfig;
	blockProps?: any
}> = ({hits, attributes}) => {
		
	const {
		displayPostAuthor,
		displayPostDate,
		listLayout,
		gridColumns,
	} = attributes
	const listBlockClassName = classnames( {
			'wp-block-latest-posts': true,
			'wp-block-latest-posts__list': true,
			'is-grid': listLayout === 'grid',
			'has-dates': displayPostDate,
			'has-author': displayPostAuthor,
			'wp-block-archives': true,
			[cx('list')]: true,
			[ `columns-${ gridColumns }` ]: listLayout === 'grid',
	} )
	return (
		<div className={classNames(cx(''))}>
		  <ul className={listBlockClassName}>
			{hits.map(hit => (
			  <li className={cx('item')} key={hit.objectID}>
				<HitItem hit={hit} attributes={attributes} />
			  </li>
			))}
		  </ul>
		</div>
	)
}

const cx = (text: string) => {
	const result = createClassNames('Hits')(text)
	if (typeof result === 'string') return result
	return result.join('-')
};
const ContainerHits = connectHits(({hits, setAttributes, attributes }: {
    hits: any[]
} & EditComponentProps) => {
        useEffect(() => {
            setAttributes({hits})
		}, [setAttributes, hits])
        return <HitItems hits={hits} attributes={attributes} />
    })


export default ContainerHits;