import { FC } from 'react'
import { BlockEditProps, BlockSaveProps } from '@wordpress/blocks';
import { AlgoliaHit, AlgoliaSearchAttributes, AlgoliaSearchSettingAttributes, CustomBlockAttribute, PostDisplayAttributes, PostDisplaySettingAttributes } from "../../block.interfaces"

export type StaticRelatedItemAttributeSettings = PostDisplaySettingAttributes &
Omit<AlgoliaSearchSettingAttributes, 'autoFocus'> &  {
	readonly hits: CustomBlockAttribute;
	readonly displaySearchForm: CustomBlockAttribute;
}
export type StaticRelatedItemAttributes = PostDisplayAttributes & AlgoliaSearchAttributes & {
	readonly hits?: Array<AlgoliaHit>
	readonly displaySearchForm: boolean;
}

export type StaticRelatedItemEditComponentProps = BlockEditProps<StaticRelatedItemAttributes>
export type StaticRelatedItemSaveComponentProps = BlockSaveProps<StaticRelatedItemAttributes>
export type StaticRelatedItemEditComponent = FC<StaticRelatedItemEditComponentProps>
export type StaticRelatedItemSaveComponent = FC<StaticRelatedItemSaveComponentProps>