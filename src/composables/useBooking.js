import { ref, reactive } from 'vue'
import axios from 'axios'

export function useBooking() {
    const isBookingModalOpen = ref(false)
    const selectedPackage = ref(null)
    const isLoading = ref(false)
    const showSuccess = ref(false)
    const generatedCode = ref('')

    const bookingForm = reactive({
        fullName: '',
        phone: '',
        message: '',
        peopleCount: 1,
        usedPromoCode: ''
    })

    const handleBook = (pkg) => {
        selectedPackage.value = pkg
        isBookingModalOpen.value = true
        showSuccess.value = false
        generatedCode.value = ''
    }

    const closeBookingModal = () => {
        isBookingModalOpen.value = false
        // Reset form after a delay to avoid flicker during closing animation
        setTimeout(() => {
            Object.assign(bookingForm, {
                fullName: '',
                phone: '',
                message: '',
                peopleCount: 1,
                usedPromoCode: ''
            })
            showSuccess.value = false
            generatedCode.value = ''
        }, 300)
    }

    const submitBooking = async () => {
        if (!bookingForm.fullName || !bookingForm.phone) {
            throw new Error('FILL_REQUIRED')
        }

        try {
            isLoading.value = true
            const response = await axios.post('http://localhost:5000/api/bookings', {
                packageId: selectedPackage.value._id,
                fullName: bookingForm.fullName,
                phone: bookingForm.phone,
                peopleCount: bookingForm.peopleCount,
                message: bookingForm.message,
                usedPromoCode: bookingForm.usedPromoCode
            })

            if (response.data.success) {
                generatedCode.value = response.data.data.myPromoCode
                showSuccess.value = true
                return response.data
            }
        } catch (error) {
            console.error('Booking submission error:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    return {
        isBookingModalOpen,
        selectedPackage,
        isLoading,
        bookingForm,
        showSuccess,
        generatedCode,
        handleBook,
        closeBookingModal,
        submitBooking
    }
}
