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
      <div class="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden transform transition-all border border-purple-50">
        <!-- Close Button -->
        <button 
            @click="$emit('close')"
            class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-purple-100 text-gray-400 hover:text-purple-600 hover:rotate-90 transition-all z-20 shadow-sm"
        >
            <span class="text-lg">✕</span>
        </button>

        <!-- Header Section -->
        <div class="bg-gradient-to-br from-purple-50/80 to-white p-6 sm:p-8 pb-4 sm:pb-5 border-b border-purple-100/50">
            <div class="flex items-center gap-2 mb-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                <span class="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-purple-600 font-bold italic">{{ t('booking.selectedTour') }}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-purple-950 font-display italic leading-tight mb-0.5">{{ packageData?.title }}</h2>
            <div class="text-lg sm:text-xl font-black text-purple-800 font-display italic">${{ packageData?.price }}</div>
        </div>

        <!-- Form Section -->
        <div v-if="!showSuccess" class="p-6 sm:p-7 space-y-4 sm:space-y-4">
            <div class="space-y-3.5">
                <!-- Name -->
                <div class="relative group">
                    <input v-model="form.fullName" type="text" :placeholder="t('booking.namePlaceholder')"
                        class="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3.5 px-5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all">
                </div>

                <!-- Phone -->
                <div class="relative group">
                    <input v-model="form.phone" type="tel" :placeholder="t('booking.phonePlaceholder')"
                        class="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3.5 px-5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all">
                </div>

                <!-- Triple Grid for People, Promo & Message -->
                <div class="grid grid-cols-2 gap-4">
                    <input v-model="form.peopleCount" type="number" min="1" :placeholder="t('booking.peoplePlaceholder')"
                        class="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3.5 px-5 text-gray-700 focus:outline-none focus:border-purple-300 transition-all">
                    <input v-model="form.usedPromoCode" type="text" :placeholder="t('booking.promoCodePlaceholder')"
                        class="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3.5 px-5 text-gray-700 placeholder:text-gray-400 uppercase focus:outline-none focus:border-purple-300 transition-all">
                </div>

                <textarea v-model="form.message" rows="2" :placeholder="t('booking.messagePlaceholder')"
                    class="w-full bg-gray-50/50 border border-gray-100 rounded-2xl py-3 px-5 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-purple-300 transition-all resize-none"></textarea>
            </div>

            <!-- Submit -->
            <button @click="submitBooking" :disabled="isLoading"
                class="w-full bg-purple-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl shadow-purple-900/10 active:scale-[0.98] disabled:opacity-70 transition-all font-display italic tracking-widest text-base group">
                <span class="inline-flex items-center gap-2">
                    {{ isLoading ? '...' : t('booking.submit') }}
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                </span>
            </button>

            <!-- Quick Contact Footer -->
            <div class="text-center pt-1 md:pt-2">
                <p class="text-[9px] uppercase tracking-widest text-gray-400 mb-1.5">{{ t('booking.orCall') }}</p>
                <a href="tel:+998785557788" class="text-lg font-black text-purple-900 hover:text-purple-600 transition-colors font-display italic">
                    +998 78 555 77 88
                </a>
            </div>
        </div>

        <!-- Success Section -->
        <div v-else class="p-6 sm:p-8 text-center animate-fade-in space-y-4 sm:space-y-5">
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-3xl shadow-sm border border-green-100 mb-4 scale-110">✓</div>
                <h3 class="text-xl sm:text-2xl font-black text-purple-950 leading-tight mb-2">{{ t('booking.success') }}</h3>
                <p class="text-gray-500 text-sm max-w-[260px] mx-auto leading-relaxed">{{ t('booking.successWithCode') }}</p>
            </div>
            
            <div class="relative group">
                <div class="absolute -inset-1 bg-gradient-to-r from-purple-100 to-purple-50 rounded-[2.5rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div class="relative bg-white border-2 border-dashed border-purple-100 rounded-[2rem] p-5 sm:p-6 flex flex-col items-center transition-all hover:border-purple-300">
                    <div class="text-4xl sm:text-5xl font-black text-purple-950 tracking-[0.2em] font-display italic mb-2 uppercase">{{ generatedCode }}</div>
                    <button @click="copyCode" class="mt-2 flex items-center gap-2 text-purple-600 font-bold text-xs hover:text-purple-900 transition-colors">
                        <span v-if="!isCopied">📋 {{ t('search.close') === 'Yopish' ? 'Nusxalash' : 'Copy' }}</span>
                        <span v-else class="text-green-600">✅ {{ t('search.close') === 'Yopish' ? 'Nusxalandi!' : 'Copied!' }}</span>
                    </button>
                </div>
            </div>

            <div class="flex flex-col gap-3">
                <a href="https://t.me/travel_startupbot" target="_blank"
                    class="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-black py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-xs uppercase tracking-wider">
                    <span class="text-xl">✈</span> Telegram Bot
                </a>
                <button @click="closeAndReset"
                    class="text-gray-400 hover:text-purple-600 font-bold py-2 transition-all text-xs uppercase tracking-widest">
                    {{ t('search.close') }}
                </button>
            </div>
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
