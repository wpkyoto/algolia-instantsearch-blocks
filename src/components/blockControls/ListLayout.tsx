import React, { useMemo } from 'react';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { ToolbarGroup } from '@wordpress/components';
import { GeneralEditComponent } from '../../block.interfaces';

export const ListLayoutControl: GeneralEditComponent = ( props ) => {
	const { setAttributes, attributes } = props;
	const { listLayout } = attributes;

	const layoutControls = useMemo( () => {
		return [
			{
				icon: 'list-view' as const,
				title: __( 'List view' ),
				onClick: () => setAttributes( { listLayout: 'list' } ),
				isActive: listLayout === 'list',
			},
			{
				icon: 'grid-view' as const,
				title: __( 'Grid view' ),
				onClick: () => setAttributes( { listLayout: 'grid' } ),
				isActive: listLayout === 'grid',
			},
		];
	}, [ listLayout, setAttributes ] );
	return <ToolbarGroup controls={ layoutControls } />;
};

export default ListLayoutControl;
