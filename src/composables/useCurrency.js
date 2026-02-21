import { ref, onMounted } from 'vue'

const exchangeRate = ref(12800) // Fallback rate

export function useCurrency() {
    const fetchRate = async () => {
        try {
            const response = await fetch('https://cbu.uz/uz/arkhiv-kursov-valyut/json/USD/')
            const data = await response.json()
            if (data && data.length > 0) {
                exchangeRate.value = parseFloat(data[0].Rate)
            }
        } catch (error) {
            console.error('Error fetching exchange rate:', error)
        }
    }

    const formatUZS = (usdAmount) => {
        if (!usdAmount) usdAmount = 0
        const uzsAmount = usdAmount * exchangeRate.value
        return new Intl.NumberFormat('uz-UZ', {
            style: 'currency',
            currency: 'UZS',
            maximumFractionDigits: 0
        }).format(uzsAmount)
    }

    const formatUSD = (usdAmount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(usdAmount || 0)
    }

    onMounted(() => {
        if (exchangeRate.value === 12800) {
            fetchRate()
        }
    })

    return {
        exchangeRate,
        formatUZS,
        formatUSD,
        fetchRate
    }
}
