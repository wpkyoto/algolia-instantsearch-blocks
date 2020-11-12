import React, { useCallback } from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody, ToggleControl, RangeControl
} from '@wordpress/components'
import { GeneralEditComponent } from '../../block.interfaces';



export const RelatedItemConfiguration: GeneralEditComponent = ({attributes, setAttributes}) => {
	const { categoryScore, postTitleScore, tagScore, enableExperimentalRelatedItems } = attributes
    const handleEnableFeature = useCallback(() => {
        setAttributes({enableExperimentalRelatedItems: !enableExperimentalRelatedItems})
    }, [enableExperimentalRelatedItems, setAttributes])
    return (
        <PanelBody title={__('Related Item Recomendation (Experimental)')}>
            <ToggleControl
                label={__('Enable feature')}
                checked={enableExperimentalRelatedItems}
                onChange={handleEnableFeature}
            />
            {!enableExperimentalRelatedItems? null: (
                <>
                <RangeControl
                    label={ __( 'Post title score' ) }
                    value={ postTitleScore }
                    onChange={ ( value ) =>
                        setAttributes( { postTitleScore: value } )
                    }
                    min={ 0 }
                    max={ 5 }
                />
                <RangeControl
                    label={ __( 'Category score' ) }
                    value={ categoryScore }
                    onChange={ ( value ) =>
                        setAttributes( { categoryScore: value } )
                    }
                    min={ 0 }
                    max={ 5 }
                />
                <RangeControl
                    label={ __( 'Tag score' ) }
                    value={ tagScore }
                    onChange={ ( value ) =>
                        setAttributes( { tagScore: value } )
                    }
                    min={ 0 }
                    max={ 5 }
                />
                </>
            )}
        </PanelBody>
    )
}