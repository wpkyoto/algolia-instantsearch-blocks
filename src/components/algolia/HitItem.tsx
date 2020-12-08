import React , {FC} from 'react'
import { __, sprintf } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { format } from '@wordpress/date';
import { AlgoliaHit, HitItemVisibleConfig } from '../../block.interfaces'

const Content: FC<{
	hit: Pick<AlgoliaHit, 'post_excerpt' | 'content' | 'permalink'>;
	attributes: Pick<HitItemVisibleConfig, 'displayPostContentRadio' | 'excerptLength'>;
}> = ({hit, attributes: {
	displayPostContentRadio,
	excerptLength,
}}) => {
	if (displayPostContentRadio === 'hide') return null;
	if (displayPostContentRadio === 'excerpt') {
		const excerpt = hit.post_excerpt || hit.content
		const needsReadMore = excerptLength < excerpt.trim().split( ' ' ).length

		const postExcerpt = needsReadMore ? (
			<>
				{ excerpt
					.trim()
					.split( ' ', excerptLength )
					.join( ' ' ) }
				{ /* translators: excerpt truncation character, default …  */ }
				{ __( ' … ' ) }
				<a
					href={ hit.permalink }
					target="_blank"
					rel="noopener noreferrer"
				>
					{ __( 'Read more' ) }
				</a>
			</>
		) : (
			<>{excerpt}</>
		);
		return (
            <div className="wp-block-latest-posts__post-excerpt">{postExcerpt}</div>
        )
	}
	return (
        <div className="wp-block-latest-posts__post-full-content">
            <div dangerouslySetInnerHTML={{__html: hit.content}} />
        </div>
    )
}


export const HitItem: FC<{
    hit: AlgoliaHit;
    attributes: HitItemVisibleConfig
}> = ({hit, attributes: {
	displayPostAuthor,
	displayPostCategory,
	displayPostDate,
	displayPostTags,
	displayPostContentRadio,
    excerptLength,
}}) => {
	return (
		<>
        <a href={hit.permalink} target="_blank" rel="noreferrer noopener">
		    <RawHTML>{hit.post_title}</RawHTML>
        </a>
		{displayPostAuthor ? (
			<div className="wp-block-latest-posts__post-author">
                { sprintf(
                    /* translators: byline. %s: current author. */
                    __( 'by %s' ),
                    hit.post_author.display_name
                ) }
            </div>
		): null}
		{displayPostDate ? (
			<time className="wp-block-latest-posts__post-date" dateTime={ format( 'c', hit.post_date ) }>{hit.post_date_formatted}</time>
		): null}
		<Content hit={hit} attributes={{displayPostContentRadio, excerptLength}} />
        {hit.taxonomies ? (
            <>
                {displayPostCategory && hit.taxonomies.category ? (
                    <div className="wp-block-latest-posts__post-author" style={{
                        marginBottom: !!hit.taxonomies.post_tag ? '0': '16px'
                    }}>
                        <b>{__('Categories')}: </b>
                        {hit.taxonomies.category.map(category => (
                            <span key={`cat-${category}`} style={{marginRight: '5px'}}>{category}</span>
                        ))}
                    </div>
                ): null}
                {displayPostTags && hit.taxonomies.post_tag ? (
                    <div className="wp-block-latest-posts__post-author" style={{
                        marginBottom: '16px'
                    }}>
                        <b>{__('Tags')}: </b>
                        {hit.taxonomies.post_tag.map(tag => (
                            <span key={`tag-${tag}`} style={{marginRight: '5px'}}>{tag}</span>
                        ))}
                    </div>
                ): null}
            </>
        ): null}
		</>
	)
}