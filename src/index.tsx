/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { registerInstantsearchBlock } from './blocks/Instantsearch/Index';
import { registerStaticRelatedItemBlock } from './blocks/StaticRelatedItems/Index';


registerStaticRelatedItemBlock()
registerInstantsearchBlock()