import React, { useMemo } from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	Toolbar
} from '@wordpress/components';
import { GeneralEditComponent } from '../../block.interfaces';

const {ToolbarGroup} = require('@wordpress/components')

export const ListLayoutControl: GeneralEditComponent = (props ) => {
	const  { setAttributes, attributes }  = props;
	const {
		listLayout
	} = attributes

	const layoutControls = useMemo(() => {
        return [
            {
                icon: 'list-view',
                title: __( 'List view' ),
                onClick: () => setAttributes( { listLayout: 'list' } ),
                isActive: listLayout === 'list',
            },
            {
                icon: 'grid-view',
                title: __( 'Grid view' ),
                onClick: () => setAttributes( { listLayout: 'grid' } ),
                isActive: listLayout === 'grid',
            },
        ];
    }, [listLayout])
	return (
        <Toolbar label="List view">
            <ToolbarGroup controls={ layoutControls } />
        </Toolbar>
	);
}

export default ListLayoutControl