import React, { FC } from 'react'
import { useCallback } from 'react'
import { ExperimentalConfigureRelatedItems } from 'react-instantsearch-dom';

import { useSelect } from '@wordpress/data';

import { useCurrentPostCategories, useCurrentPostTags } from '../../hooks/PostAttributes';
import { GeneralEditComponent } from 'src/block.interfaces';

export const ExperimentalRelatedItems: GeneralEditComponent = (props) => {
	const  { attributes }  = props;
	const {
		enableExperimentalRelatedItems,
		categoryScore, postTitleScore, tagScore,
	} = attributes

	const categories = useCurrentPostCategories()
	const tags = useCurrentPostTags()
	const postTitle = useSelect(select => select('core/editor').getEditedPostAttribute('title'))

	const transformSearchParameters = useCallback(param => {
		if (categoryScore > 0) {
			categories.forEach(category => {
				param.optionalFilters.push(`taxonomies.category:${category.name}<score=${categoryScore}>`)
			})
		}
		if (tagScore > 0) {
			tags.forEach(tag => {
				param.optionalFilters.push(`taxonomies.post_tag:${tag.name}<score=${tagScore}>`)
			})
		}
		return param
	}, [categories, tags, categoryScore, tagScore])
    if (!enableExperimentalRelatedItems) return null;

	return (
        <ExperimentalConfigureRelatedItems
            hit={{
                post_title: postTitle ||  ''
            }}
            matchingPatterns={{
                post_title: {
                    score: postTitleScore
                },
            }}
            transformSearchParameters={transformSearchParameters}
        />
	);
}

export default ExperimentalRelatedItems