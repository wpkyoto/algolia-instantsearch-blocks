import { useSelect } from '@wordpress/data';

export const useCurrentPostCategories = () => {
	const categoryIds = useSelect(select => {
		return select('core/editor').getEditedPostAttribute<number[]>('categories')
	}, [])
	return useSelect((select) => {
		const {getEntityRecords} = select('core')
		const taxonomies = getEntityRecords<Array<{id: number; name: string;}>>('taxonomy', 'category')
		if (!taxonomies) return []
		const currentCategories = taxonomies.filter(taxonomy => {
			return categoryIds.includes(taxonomy.id)
		})
		return currentCategories
	}, [categoryIds])
}

export const useCurrentPostTags = () => {
	const tagIds = useSelect(select => {
		return select('core/editor').getEditedPostAttribute<number[]>('tags')
	}, [])
	return useSelect((select) => {
		const {getEntityRecords} = select('core')
		const taxonomies = getEntityRecords<Array<{id: number; name: string;}>>('taxonomy', 'post_tag')
		if (!taxonomies) return []
		const currentTags = taxonomies.filter(taxonomy => {
			return tagIds.includes(taxonomy.id)
		})
		return currentTags
	}, [tagIds])
}
