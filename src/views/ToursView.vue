<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { usePackages } from '../composables/usePackages'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BookingModal from '../components/BookingModal.vue'

import { useBooking } from '../composables/useBooking'

const { t } = useI18n()
const { featuredPackages, fetchPackages } = usePackages()

const {
    isBookingModalOpen,
    selectedPackage,
    handleBook,
    closeBookingModal
} = useBooking()

onMounted(() => {
    fetchPackages()
})

const calculateDuration = (start, end) => {
    if (!start || !end) return 7
    const s = new Date(start)
    const e = new Date(end)
    return Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24))
}
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white bg-[#F8FAFC]">
    <Navbar />

    <!-- Premium Header -->
    <section class="relative pt-40 pb-24 overflow-hidden bg-[#0B1120]">
        <div class="absolute inset-0">
             <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#003B95]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
             <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFA500]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
             <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        </div>

        <div class="relative z-10 container mx-auto px-6 text-center">
            <span class="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[#FFA500] text-xs font-black uppercase tracking-[0.3em] mb-6" data-aos="fade-down">
                {{ t('toursPage.label') }}
            </span>
            <h1 class="text-3xl sm:text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter font-display leading-tight" data-aos="zoom-in" data-aos-delay="100">
                {{ t('toursPage.title') }} <span class="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent italic">{{ t('toursPage.titleHighlight') }}</span> {{ t('toursPage.titleSuffix') }}
            </h1>
            <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
                {{ t('toursPage.description') }}
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <main class="py-24 container mx-auto px-6 flex-grow">
        <!-- Grid Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-14">
            <div 
                v-for="(pkg, index) in featuredPackages" 
                :key="pkg._id" 
                class="group bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all duration-700 hover:-translate-y-4"
                data-aos="fade-up"
                :data-aos-delay="index * 100"
            >
                <!-- Image Section -->
                <div class="h-[250px] sm:h-[350px] md:h-[400px] relative overflow-hidden">
                    <router-link :to="`/packages/${pkg._id}`">
                        <img :src="pkg.image" :alt="pkg.title" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-1000 ease-out">
                    </router-link>
                    
                    <!-- Glass Badge -->
                    <div class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl transform group-hover:scale-110 transition duration-500">
                         <span class="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest block mb-0.5">{{ t('toursPage.from') }}</span>
                         <span class="text-xl sm:text-2xl font-black text-[#003B95] tracking-tight font-display italic">${{ pkg.price }}</span>
                    </div>

                    <!-- Location Overlay -->
                    <div class="absolute bottom-0 left-0 w-full p-6 sm:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                         <div class="flex items-center gap-2 text-[#FFA500] text-[10px] sm:text-xs font-black uppercase tracking-widest mb-2">
                             <span class="w-4 sm:w-6 h-0.5 bg-[#FFA500]"></span>
                             {{ pkg.destination }}
                         </div>
                         <h3 class="text-xl sm:text-3xl font-black text-white tracking-tight leading-none font-display italic">{{ pkg.title }}</h3>
                    </div>
                </div>

                <!-- Info Section -->
                <div class="p-6 sm:p-8 md:p-10">
                    <p class="text-gray-500 text-sm sm:text-base font-medium leading-relaxed mb-8 line-clamp-2 italic">"{{ pkg.description }}"</p>
                    
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-gray-100">
                        <div class="flex items-center gap-3 sm:gap-4">
                            <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center text-lg sm:text-xl">🕒</div>
                            <div>
                                <span class="block text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">{{ t('toursPage.duration') }}</span>
                                <span class="text-sm sm:text-base font-black text-[#0B1120]">{{ calculateDuration(pkg.startDate, pkg.endDate) }} {{ t('packages.days') }}</span>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-2 w-full sm:w-auto">
                             <RouterLink 
                                :to="`/packages/${pkg._id}`" 
                                class="flex-1 sm:flex-none px-6 py-4 rounded-2xl bg-gray-50 text-gray-500 font-extrabold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all text-center"
                             >
                                {{ t('packages.details') }}
                             </RouterLink>
                             <button 
                                @click="handleBook(pkg)" 
                                class="flex-1 sm:flex-none px-6 py-4 rounded-2xl bg-primary text-white font-extrabold text-[10px] uppercase tracking-widest hover:bg-primary-dark transition-all transform active:scale-95 shadow-xl shadow-blue-500/10"
                             >
                                {{ t('packages.order') }}
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div v-if="featuredPackages.length === 0" class="py-40 text-center animate-fade-in">
             <div class="text-8xl mb-8">🧭</div>
             <h2 class="text-4xl font-black text-[#0B1120] mb-4 font-display italic">{{ t('toursPage.emptyTitle') }}</h2>
             <p class="text-gray-500 max-w-md mx-auto">{{ t('toursPage.emptyDesc') }}</p>
        </div>
    </main>

    <Footer />
    
    <BookingModal 
      :isOpen="isBookingModalOpen"
      :packageData="selectedPackage"
      @close="closeBookingModal"
    />
  </div>
</template>

<style scoped>
.font-display {
    font-family: 'Outfit', sans-serif;
}
</style>

