import React, { useCallback } from 'react'
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody, ToggleControl,
} from '@wordpress/components'
import { GeneralEditComponent } from '../../block.interfaces';



export const HitItemVisibilityPanel: GeneralEditComponent = ({attributes, setAttributes}) => {
    const {
        displayPostDate, displayPostAuthor,
         displayPostCategory, displayPostTags,
         isUsingPaidPlan,
     } = attributes
	const handleDisplayPostDate = useCallback(() => {
		setAttributes({
			displayPostDate: !displayPostDate
		})
	}, [setAttributes, displayPostDate])
	const handleDisplayPostAuthor = useCallback(() => {
		setAttributes({
			displayPostAuthor: !displayPostAuthor
		})
	}, [setAttributes, displayPostAuthor])
	const handleDisplayPostCategory = useCallback(() => {
		setAttributes({
			displayPostCategory: !displayPostCategory
		})
    }, [displayPostCategory])
	const handleDisplayPostTags = useCallback(() => {
		setAttributes({
			displayPostTags: !displayPostTags
		})
    }, [displayPostTags])
	const handlePaidPlanChecker = useCallback(() => {
		setAttributes({
			isUsingPaidPlan: !isUsingPaidPlan
		})
    }, [isUsingPaidPlan])
    return (
        <PanelBody title={__('Hit item')}>
            <ToggleControl
                label={__('Show Author')}
                checked={displayPostAuthor}
                onChange={handleDisplayPostAuthor}
            />
            <ToggleControl
                label={__('Show Post date')}
                checked={displayPostDate}
                onChange={handleDisplayPostDate}
            />
            <ToggleControl
                label={__('Show category')}
                checked={displayPostCategory}
                onChange={handleDisplayPostCategory}
            />
            <ToggleControl
                label={__('Show Tags')}
                checked={displayPostTags}
                onChange={handleDisplayPostTags}
            />
            <ToggleControl
                label={__('Using payd plan')}
                checked={isUsingPaidPlan}
                onChange={handlePaidPlanChecker}
            />
        </PanelBody>
    )
}