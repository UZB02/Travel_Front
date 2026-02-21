<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

const props = defineProps({
  isOpen: Boolean,
  packageData: Object
})

const emit = defineEmits(['close'])

const form = reactive({
  fullName: '',
  phone: '',
  message: '',
  peopleCount: 1,
  usedPromoCode: ''
})

const isLoading = ref(false)
const generatedCode = ref('')
const showSuccess = ref(false)

const submitBooking = async () => {
    if (!form.fullName || !form.phone) {
        alert(t('booking.fillRequired'))
        return
    }

    isLoading.value = true
    try {
        const response = await axios.post('http://localhost:5000/api/bookings', {
            packageId: props.packageData._id,
            fullName: form.fullName,
            phone: form.phone,
            peopleCount: form.peopleCount,
            message: form.message,
            usedPromoCode: form.usedPromoCode
        })

        if (response.data.success) {
            generatedCode.value = response.data.data.myPromoCode
            showSuccess.value = true
            
            // Reset form
            form.fullName = ''
            form.phone = ''
            form.message = ''
            form.peopleCount = 1
            form.usedPromoCode = ''
        }
    } catch (error) {
        console.error(error)
        alert(t('booking.error'))
    } finally {
        isLoading.value = false
    }
}

const closeAndReset = () => {
    showSuccess.value = false
    generatedCode.value = ''
    emit('close')
}

const isCopied = ref(false)

const copyCode = () => {
    navigator.clipboard.writeText(generatedCode.value)
    isCopied.value = true
    setTimeout(() => {
        isCopied.value = false
    }, 2000)
}
</script>

<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')"></div>

      <!-- Modal Content -->
      <div class="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
        <!-- Close Button (inside header, top-right, always visible) -->
        <button 
            @click="$emit('close')"
            class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-purple-100 text-gray-400 hover:text-purple-600 transition-all z-20 shadow-sm text-sm"
        >
            ✕
        </button>

        <!-- Header Section (Light Purple Background) -->
        <div class="bg-purple-50 p-5 sm:p-8 pb-4 sm:pb-6 border-b border-purple-100">
            <!-- Top row: label + price, with right padding to avoid X button -->
            <div class="flex items-start justify-between pr-10 mb-1">
                <div class="flex items-center gap-2 text-purple-600 font-semibold">
                    <span class="text-xs uppercase tracking-wider">📍 {{ t('booking.selectedTour') }}</span>
                </div>
                <div class="text-lg sm:text-2xl font-black text-purple-900 font-display italic tracking-tight shrink-0 ml-2">${{ packageData?.price }}</div>
            </div>
            <h2 class="text-lg sm:text-2xl font-black text-purple-900 font-display italic leading-tight pr-2">{{ packageData?.title }}</h2>
        </div>

        <!-- Form Section -->
        <div v-if="!showSuccess" class="p-6 sm:p-8 space-y-4 sm:space-y-5">
            <!-- Name Input -->
            <div class="relative group">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors text-sm">
                    👤
                </div>
                <input 
                    v-model="form.fullName"
                    type="text" 
                    :placeholder="t('booking.namePlaceholder')"
                    class="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm sm:text-base"
                >
            </div>

            <!-- Phone Input -->
            <div class="relative group">
                <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors text-sm">
                    📞
                </div>
                <input 
                    v-model="form.phone"
                    type="tel" 
                    :placeholder="t('booking.phonePlaceholder')"
                    class="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm sm:text-base"
                >
            </div>

            <!-- People Count & Promo Code -->
            <div class="grid grid-cols-2 gap-4">
                <div class="relative group">
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors text-sm">
                        👥
                    </div>
                    <input 
                        v-model="form.peopleCount"
                        type="number" 
                        min="1"
                        :placeholder="t('booking.peoplePlaceholder')"
                        class="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm sm:text-base"
                    >
                </div>
                <div class="relative group">
                    <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors text-sm">
                        🎟️
                    </div>
                    <input 
                        v-model="form.usedPromoCode"
                        type="text" 
                        :placeholder="t('booking.promoCodePlaceholder')"
                        class="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-3.5 pl-11 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all text-sm sm:text-base uppercase"
                    >
                </div>
            </div>

            <!-- Message Input -->
            <div class="relative group">
                <textarea 
                    v-model="form.message"
                    rows="2"
                    :placeholder="t('booking.messagePlaceholder')"
                    class="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 sm:py-3.5 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all resize-none text-sm sm:text-base"
                ></textarea>
                <div class="absolute bottom-2 right-2 text-gray-300 text-xs">
                    ✎
                </div>
            </div>

            <!-- Submit Button -->
            <button 
                @click="submitBooking"
                :disabled="isLoading"
                class="w-full bg-purple-800 hover:bg-purple-900 text-white font-black py-4 rounded-xl shadow-lg shadow-purple-900/20 transform transition active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-display italic tracking-wider text-sm sm:text-base"
            >
                <span v-if="!isLoading">{{ t('booking.submit') }}</span>
                <span v-else>Loading...</span>
            </button>

            <!-- Footer -->
            <div class="text-center pt-1 sm:pt-2">
                <p class="text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest mb-1">{{ t('booking.orCall') }}</p>
                <a href="tel:+998785557788" class="text-purple-800 font-black text-base sm:text-lg hover:text-purple-900 transition flex items-center justify-center gap-2 font-display italic">
                    <span class="text-xl">📞</span> +998 78 555 77 88
                </a>
            </div>
        </div>

        <!-- Success Section -->
        <div v-else class="p-8 text-center space-y-6 animate-fade-in">
            <div class="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-sm border border-green-100">
                ✓
            </div>
            <div>
                <h3 class="text-xl font-black text-purple-900 mb-2 leading-tight">{{ t('booking.success') }}</h3>
                <p class="text-gray-500 text-sm px-4">{{ t('booking.successWithCode') }}</p>
            </div>
            
            <div class="bg-purple-50 border-2 border-dashed border-purple-200 rounded-2xl p-6 relative group transition-all hover:border-purple-300">
                <div class="text-4xl font-black text-purple-800 tracking-[0.2em] font-display italic mb-2">{{ generatedCode }}</div>
                <div class="text-[10px] text-purple-400 uppercase tracking-widest">{{ t('booking.promoCodeCopy') }}</div>
                
                <!-- Explicit Copy Button -->
                <button 
                    @click="copyCode"
                    class="mt-4 flex items-center gap-2 mx-auto bg-white border border-purple-100 px-4 py-2 rounded-xl text-purple-600 font-bold text-xs hover:bg-purple-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                    <span v-if="!isCopied">📋 Nusxalash</span>
                    <span v-else>✅ Nusxalandi!</span>
                </button>
            </div>

            <button 
                @click="closeAndReset"
                class="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold py-4 rounded-xl transition border border-gray-100"
            >
                {{ t('search.close') }}
            </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .transform,
.modal-leave-active .transform {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from .transform,
.modal-leave-to .transform {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
</style>
