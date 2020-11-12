import React, { useCallback, useState } from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody, ToggleControl, RangeControl, TextControl, Icon, Button, BaseControl
} from '@wordpress/components'

import { SearchBox } from 'react-instantsearch-dom';
import { StaticRelatedItemEditComponent } from '../block.interfaces';
const { useInstanceId } = require('@wordpress/compose')


export const SearchOption: StaticRelatedItemEditComponent = ({attributes, setAttributes}) => {
	const { displaySearchForm, hitsItems, indexName } = attributes
    const [tmpIndexName, changeIndexName] = useState(indexName)
	const handleDisplaySearchForm = useCallback(() => {
		setAttributes({
			displaySearchForm: !displaySearchForm
		})
	}, [setAttributes, displaySearchForm])
    const handleUpdateHitItems = useCallback((value) => {
        setAttributes({hitsItems: value})
    }, [setAttributes])
    const handleChangeIndexName = useCallback(() => {
        setAttributes({indexName: tmpIndexName})
    }, [setAttributes, tmpIndexName])
	const instanceId = useInstanceId( TextControl );
	const id = `inspector-text-control-${ instanceId }`;
	const onChangeValue = useCallback(( event ) => changeIndexName( event.target.value ), [changeIndexName])
    return (
        <PanelBody title={__('Search Option')}>
            <BaseControl
                label={ __( 'Index name' ) }
                id={ id }
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <input
                        className="components-text-control__input"
                        type="text"
                        id={ id }
                        value={ tmpIndexName }
                        onChange={ onChangeValue }
                        onKeyDown={e => {
                            if (e.key !== 'Enter') return;
                            handleChangeIndexName()
                        }}
                    />
                    <Button onClick={handleChangeIndexName} isSecondary>
                        <Icon icon="search" />{ __( 'Search' ) }
                    </Button>
                </div>
            </BaseControl>
            
            
            <RangeControl
                label={ __( 'Hit items' ) }
                value={ hitsItems }
                onChange={handleUpdateHitItems}
                min={ 1 }
            />
            <ToggleControl
                label={__('Filter By keyword')}
                checked={displaySearchForm}
                onChange={handleDisplaySearchForm}
            />
            {!displaySearchForm ? null: <SearchBox />}
        </PanelBody>
    )
}