import React, { useCallback, useState } from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody, RangeControl, TextControl, Button, BaseControl, SelectControl, ToggleControl
} from '@wordpress/components'
import { InstantSearchEditComponent } from '../block.interfaces';
const { useInstanceId } = require('@wordpress/compose')


const IndexName: InstantSearchEditComponent = ({attributes: {indexName}, setAttributes}) => {
    const [tmpIndexName, changeIndexName] = useState(indexName)
    const handleChangeIndexName = useCallback(() => {
        setAttributes({indexName: tmpIndexName})
    }, [setAttributes, tmpIndexName])
	const instanceId = useInstanceId( TextControl );
	const id = `inspector-text-control-${ instanceId }`;
	const onChangeValue = useCallback(( event ) => changeIndexName( event.target.value ), [changeIndexName])
    return (
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
                    { __( 'Update' ) }
                </Button>
            </div>
        </BaseControl>
    )
}

export const SearchOption: InstantSearchEditComponent = (props) => {
	const { attributes:{
        hitsItems,
        searchFormStyle,
        autoFocus,
    }, setAttributes } = props
    const handleUpdateHitItems = useCallback((value) => {
        setAttributes({hitsItems: value})
    }, [setAttributes])

    console.log({autoFocus})
    return (
        <PanelBody title={__('Search Option')}>
            <IndexName {...props} />
            <RangeControl
                label={ __( 'Hit items' ) }
                value={ hitsItems }
                onChange={handleUpdateHitItems}
                min={ 1 }
            />
            <SelectControl
                label={ __('SearchBox Style' ) }
                value={ searchFormStyle }
                options={[{
                    value: 'wordpress',
                    label: 'WordPress'
                }, {
                    value: 'algolia',
                    label: 'Algolia'
                }]}
                onChange={(value) => setAttributes({searchFormStyle: value})}
            />
            <ToggleControl
                label={__('Auto focus')}
                checked={autoFocus}
                onChange={() => {
                    setAttributes({
                        autoFocus: !autoFocus
                    })
                }}
            />
        </PanelBody>
    )
}