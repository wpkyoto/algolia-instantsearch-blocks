import { useSelect } from '@wordpress/data';

export const useCurrentPostCategories = () => {
	const categoryIds = useSelect(select => {
		return (select('core/editor') as any).getEditedPostAttribute('categories') as number[]
	}, [])
	return useSelect((select) => {
		const {getEntityRecords} = (select('core') as any)
		const taxonomies = getEntityRecords('taxonomy', 'category') as Array<{id: number; name: string;}>
		if (!taxonomies) return []
		const currentCategories = taxonomies.filter(taxonomy => {
			return categoryIds.includes(taxonomy.id)
		})
		return currentCategories
	}, [categoryIds])
}

export const useCurrentPostTags = () => {
	const tagIds = useSelect(select => {
		return (select('core/editor') as any).getEditedPostAttribute('tags') as number[]
	}, [])
	return useSelect((select) => {
		const {getEntityRecords} = (select('core') as any)
		const taxonomies = getEntityRecords('taxonomy', 'post_tag') as Array<{id: number; name: string;}>
		if (!taxonomies) return []
		const currentTags = taxonomies.filter(taxonomy => {
			return tagIds.includes(taxonomy.id)
		})
		return currentTags
	}, [tagIds])
}
