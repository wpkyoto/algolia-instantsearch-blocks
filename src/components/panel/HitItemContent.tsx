import React, { useCallback } from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody, RadioControl, RangeControl
} from '@wordpress/components'
import { GeneralEditComponent } from 'src/block.interfaces';



export const HitItemContentPanel: GeneralEditComponent = ({attributes, setAttributes}) => {
    const {
        displayPostContentRadio, excerptLength, listLayout, gridColumns
     } = attributes
     const handleChangeGridColumns = useCallback((value) => {
         setAttributes( { 
             gridColumns: value
          } )
     }, [setAttributes])
    const handleChangeContentType = useCallback((value) => {
        setAttributes( {
            displayPostContentRadio: value,
        } )
    }, [setAttributes])
    return (
        <PanelBody title={__('Post Content')}>
			<RadioControl
				label={ __( 'Show:' ) }
				selected={ displayPostContentRadio }
				options={ [
					{ label: __( 'Excerpt' ), value: 'excerpt' },
					{
						label: __( 'Full post' ),
						value: 'full_post',
					},
					{
						label: __( 'Nothing' ),
						value: 'hide',
					},
				] }
				onChange={handleChangeContentType}
			/>
            { displayPostContentRadio === 'excerpt' && (
                    <RangeControl
                        label={ __( 'Max number of words in excerpt' ) }
                        value={ excerptLength }
                        onChange={ ( value ) =>
                            setAttributes( { excerptLength: value } )
                        }
                        min={ 10 }
                    />
                ) }
            { listLayout === 'list' ? null : (
                <RangeControl
                    label={ __( 'Column number' ) }
                    value={ gridColumns }
                    onChange={handleChangeGridColumns}
                    min={ 1 }
                    max={ 6 }
                />
            )}
        </PanelBody>
    )
}