<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import BookingModal from '../components/BookingModal.vue'
import { useBooking } from '../composables/useBooking'
import { useCurrency } from '../composables/useCurrency'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()
const packageDetails = ref(null)
const isLoading = ref(true)
const activeImage = ref('')
const { formatUZS, formatUSD } = useCurrency()

const { 
  isBookingModalOpen, 
  selectedPackage, 
  handleBook, 
  closeBookingModal 
} = useBooking()

const calculateDuration = (start, end) => {
    if (!start || !end) return 7
    const s = new Date(start)
    const e = new Date(end)
    const diffTime = Math.abs(e - s)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const fetchPackageDetails = async () => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/packages/${route.params.id}`)
        if (data.success) {
            packageDetails.value = data.data
            // Mock data if empty
            if (!packageDetails.value.gallery || packageDetails.value.gallery.length === 0) {
                packageDetails.value.gallery = [
                    packageDetails.value.image,
                    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1473&q=80'
                ]
            }
            if (!packageDetails.value.features || packageDetails.value.features.length === 0) {
                packageDetails.value.features = [
                    t('packageDetails.feature1'),
                    t('packageDetails.feature2'),
                    t('packageDetails.feature3'),
                    t('packageDetails.feature4'),
                    t('packageDetails.feature5'),
                    t('packageDetails.feature6')
                ]
            }
            activeImage.value = packageDetails.value.image
        }
    } catch (error) {
        console.error('Error fetching details:', error)
    } finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchPackageDetails()
})
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white bg-[#F8FAFC]">
    <Navbar />

    <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
        <div class="w-16 h-16 border-4 border-[#003B95] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <div v-else-if="packageDetails" class="animate-fade-in">
        <!-- Immersive Header Section -->
        <section class="relative min-h-[70vh] md:h-[70vh] flex items-end pb-10 md:pb-20 overflow-hidden">
            <div class="absolute inset-0">
                <img :src="packageDetails.image" class="w-full h-full object-cover transform scale-105" alt="Header Image">
                <div class="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-[#0B1120]/60"></div>
            </div>
            
            <div class="relative z-10 container mx-auto px-4 sm:px-6 pt-28 md:pt-0">
                 <div class="flex items-center gap-3 text-[#FFA500] font-black uppercase tracking-[0.3em] mb-3 text-xs animate-fade-in-up">
                    <span class="w-6 md:w-10 h-0.5 bg-[#FFA500]"></span>
                    {{ packageDetails.destination }}
                 </div>
                 <h1 class="text-3xl sm:text-5xl md:text-8xl font-black text-white tracking-tighter font-display mb-5 animate-fade-in-up italic leading-tight">
                    {{ packageDetails.title }}
                 </h1>
                 
                 <div class="flex flex-wrap items-center gap-2 md:gap-4 animate-fade-in-up delay-100">
                    <div class="flex items-center gap-1.5 text-white/80 text-xs md:text-sm font-bold bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span>⏳</span> 
                        {{ calculateDuration(packageDetails.startDate, packageDetails.endDate) }} {{ t('packages.days') }} / {{ calculateDuration(packageDetails.startDate, packageDetails.endDate) - 1 }} {{ t('packageDetails.nights') }}
                    </div>
                    <div class="flex items-center gap-1.5 text-white/80 text-xs md:text-sm font-bold bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span>📅</span> 
                        {{ new Date(packageDetails.startDate).toLocaleDateString() }} — {{ new Date(packageDetails.endDate).toLocaleDateString() }}
                    </div>
                    <div class="flex items-center gap-1.5 text-white/80 text-xs md:text-sm font-bold bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <span>⭐</span> 4.9 {{ t('packageDetails.rated') }}
                    </div>
                 </div>
            </div>
        </section>

        <!-- Main Layout -->
        <main class="container mx-auto px-6 -mt-10 relative z-20 pb-24">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
                <!-- Left Detail Column -->
                <div class="lg:col-span-8 space-y-12">
                    
                    <!-- Gallery Tray -->
                    <div class="bg-white rounded-[3rem] p-4 shadow-2xl shadow-blue-900/5">
                        <div class="rounded-[2.5rem] overflow-hidden aspect-video shadow-inner flex items-center justify-center bg-gray-100">
                            <img :src="activeImage" class="w-full h-full object-cover transition-all duration-1000" :key="activeImage">
                        </div>
                        <div class="flex gap-4 p-4 overflow-x-auto no-scrollbar pt-8">
                            <button 
                                v-for="(img, idx) in packageDetails.gallery" 
                                :key="idx" 
                                @click="activeImage = img"
                                class="flex-shrink-0 w-24 md:w-32 h-20 md:h-24 rounded-2xl overflow-hidden border-4 transition-all duration-300 transform"
                                :class="activeImage === img ? 'border-[#003B95] scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'"
                            >
                                <img :src="img" class="w-full h-full object-cover">
                            </button>
                        </div>
                    </div>

                    <!-- Story & Details -->
                    <div class="bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl shadow-blue-900/5 border border-gray-100">
                        <div class="mb-12">
                            <span class="text-[#003B95] font-black uppercase tracking-widest text-xs block mb-4">{{ t('packageDetails.experience') }}</span>
                            <h2 class="text-4xl font-black text-[#0B1120] font-display italic mb-8">{{ t('packageDetails.aboutJourney') }}</h2>
                            <p class="text-gray-500 text-lg md:text-xl leading-relaxed italic">"{{ packageDetails.description }}"</p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <h4 class="text-xl font-black text-[#0B1120] mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                                    <span class="w-2 h-8 bg-[#FFA500] rounded-full"></span>
                                    {{ t('packageDetails.includedFeatures') }}
                                </h4>
                                <ul class="space-y-4">
                                    <li v-for="feature in packageDetails.features" :key="feature" class="flex items-center gap-4 text-gray-600 font-bold group hover:text-[#003B95] transition">
                                        <span class="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-xs group-hover:bg-[#003B95] group-hover:text-white transition">✓</span>
                                        {{ feature }}
                                    </li>
                                </ul>
                            </div>
                            
                            <!-- Immersive Sidebar Element -->
                            <div class="bg-gradient-to-br from-[#0B1120] to-[#1E293B] rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                                <div class="absolute top-0 right-0 w-32 h-32 bg-[#003B95]/20 rounded-full blur-2xl"></div>
                                <h4 class="text-2xl font-black mb-4 font-display italic">{{ t('packageDetails.expertTip') }}</h4>
                                <p class="text-gray-400 text-sm leading-relaxed mb-6">"{{ t('packageDetails.guideQuote') }}"</p>
                                <div class="flex items-center gap-4 pt-4 border-t border-white/5">
                                    <div class="w-10 h-10 rounded-full bg-gray-600 border border-white/10 overflow-hidden">
                                        <img src="https://i.pravatar.cc/40?u=guide" :alt="t('packageDetails.seniorGuide')">
                                    </div>
                                    <div>
                                        <span class="block text-xs font-bold text-white">James Wilson</span>
                                        <span class="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">{{ t('packageDetails.seniorGuide') }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar: Booking -->
                <div class="lg:col-span-4">
                    <div class="sticky top-32 space-y-8">
                        <!-- Pricing Card -->
                        <div class="bg-white rounded-[3rem] p-10 shadow-2xl shadow-blue-900/10 border border-blue-50 overflow-hidden relative group">
                            <div class="absolute -top-10 -right-10 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-[#FFA500]/10 transition duration-1000"></div>
                            
                            <div class="mb-10 text-center">
                                <span class="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">{{ t('packageDetails.investment') }}</span>
                                <h3 class="text-6xl font-black text-[#003B95] font-display tracking-tighter italic">
                                    {{ formatUSD(packageDetails.price) }}
                                </h3>
                                <div class="text-sm font-black text-emerald-600 font-display italic mt-2">
                                    {{ formatUZS(packageDetails.price) }}
                                </div>
                                <p class="text-gray-400 text-xs font-bold mt-2 uppercase">{{ t('packageDetails.perPerson') }}</p>
                            </div>

                            <div class="space-y-4 mb-10">
                                <button @click="handleBook(packageDetails)" class="w-full bg-[#003B95] text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-blue-900/30 hover:bg-[#FFA500] hover:shadow-orange-900/30 transition-all duration-500 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
                                    {{ t('packageDetails.bookNow') }} <span>→</span>
                                </button>
                                <button @click="router.push('/contact')" class="w-full bg-gray-50 text-gray-400 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:text-[#0B1120] transition">
                                    {{ t('packageDetails.enquire') }}
                                </button>
                            </div>

                            <hr class="border-gray-50 mb-8 font-black uppercase tracking-widest text-[#003B95]">
                            
                            <div class="space-y-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-lg">🛡️</div>
                                    <p class="text-xs font-bold text-gray-500 leading-tight">{{ t('packageDetails.securePayment') }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-lg">🔄</div>
                                    <p class="text-xs font-bold text-gray-500 leading-tight">{{ t('packageDetails.freeCancellation') }}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Trust Badge -->
                        <div class="text-center px-8">
                            <p class="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{{ t('packageDetails.certified') }}</p>
                            <div class="flex justify-center gap-6 opacity-30 grayscale saturate-0">
                                <span class="text-2xl font-black tracking-tighter font-display italic">IATA</span>
                                <span class="text-2xl font-black tracking-tighter font-display italic">TRUST</span>
                                <span class="text-2xl font-black tracking-tighter font-display italic">LUXE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <!-- Features/Itinerary Section -->
    <BookingModal 
      :isOpen="isBookingModalOpen"
      :packageData="selectedPackage"
      @close="closeBookingModal"
    />

    <Footer />
  </div>
</template>

<style scoped>
.font-display {
    font-family: 'Outfit', sans-serif;
}

.animate-fade-in {
    animation: fadeIn 1s ease-out;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

