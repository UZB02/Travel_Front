import { ref } from 'vue'
import axios from 'axios'

export function usePackages() {
    const featuredPackages = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const getDays = (start, end) => {
        const diff = new Date(end) - new Date(start)
        return Math.ceil(diff / (1000 * 60 * 60 * 24))
    }

    const fetchPackages = async () => {
        isLoading.value = true
        try {
            const { data } = await axios.get('http://localhost:5000/api/packages')
            if (data.success) {
                featuredPackages.value = data.data.map(pkg => ({
                    ...pkg,
                    days: getDays(pkg.startDate, pkg.endDate),
                    rating: (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1)
                }))
            }
        } catch (err) {
            console.error('Error fetching packages:', err)
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    const searchQuery = ref('')
    const searchDate = ref('')
    const searchResults = ref([])
    const isSearchModalOpen = ref(false)

    const searchPackages = () => {
        if (!searchQuery.value && !searchDate.value) return

        const query = searchQuery.value.toLowerCase().trim()
        const date = searchDate.value

        // 1. Try Exact/Partial Matches
        const matches = featuredPackages.value.filter(pkg => {
            const dest = pkg.destination.toLowerCase()
            const title = pkg.title.toLowerCase()

            const matchDest = !query ||
                dest.includes(query) ||
                title.includes(query) ||
                query.includes(dest) ||
                query.split(' ').some(word => word.length > 2 && (dest.includes(word) || title.includes(word)))

            const matchDate = !date || new Date(pkg.startDate).toISOString().split('T')[0] === date

            return matchDest && matchDate
        })

        if (matches.length > 0) {
            searchResults.value = matches
        } else {
            // 2. If no matches, provide "Closest" recommendations based on destination similarity or just random ones
            // For now, let's provide 3 diverse recommendations
            searchResults.value = featuredPackages.value
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
        }
        isSearchModalOpen.value = true
    }

    const closeSearchModal = () => {
        isSearchModalOpen.value = false
    }

    return {
        featuredPackages,
        isLoading,
        error,
        fetchPackages,
        searchQuery,
        searchDate,
        searchResults,
        isSearchModalOpen,
        searchPackages,
        closeSearchModal
    }
}
