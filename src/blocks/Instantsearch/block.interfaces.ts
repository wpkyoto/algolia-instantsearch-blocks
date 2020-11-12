import { FC } from 'react'
import { BlockEditProps, BlockSaveProps } from '@wordpress/blocks';
import { AlgoliaSearchAttributes, AlgoliaSearchSettingAttributes, CustomBlockAttribute, PostDisplayAttributes, PostDisplaySettingAttributes } from "../../block.interfaces"

export type InstantSearchAttributeSettings = PostDisplaySettingAttributes & AlgoliaSearchSettingAttributes &{
    searchOnlyApiKey: CustomBlockAttribute;
    appId: CustomBlockAttribute;
}
export type InstantSearchAttributes = PostDisplayAttributes & AlgoliaSearchAttributes & {
    searchOnlyApiKey: {
        type: 'string',
    },
    appId: {
        type: 'string',
    }
}

export type InstantSearchEditComponentProps = BlockEditProps<InstantSearchAttributes>
export type InstantSearchSaveComponentProps = BlockSaveProps<InstantSearchAttributes>
export type InstantSearchEditComponent = FC<InstantSearchEditComponentProps>
export type InstantSearchSaveComponent = FC<InstantSearchSaveComponentProps>