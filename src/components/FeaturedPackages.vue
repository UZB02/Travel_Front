<template>
    <section id="hot-tours" class="py-24 bg-white relative">
        <div class="container mx-auto px-6">
            <!-- Section Header -->
            <div class="text-center mb-16 px-4">
                <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{{ t('home.hotToursTitle') }}</h2>
                <div class="w-24 h-1.5 bg-secondary mx-auto rounded-full"></div>
            </div>

            <!-- Packages Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                <div 
                    v-for="(pkg, index) in featuredPackages" 
                    :key="pkg._id" 
                    class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-2 hover:scale-[1.02]"
                    data-aos="fade-up"
                    :data-aos-delay="index * 150"
                >
                    
                    <!-- Image Container -->
                    <div class="relative h-64 overflow-hidden">
                        <img :src="pkg.image" :alt="pkg.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                        <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-sm font-bold text-primary shadow-sm">
                            {{ calculateDuration(pkg.startDate, pkg.endDate) }} {{ t('packages.days') }}
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    <!-- Content -->
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">{{ pkg.title }}</h3>
                        </div>
                        
                        <div class="flex items-center text-gray-500 text-sm mb-4">
                            <span>📍 {{ pkg.destination }}</span>
                        </div>

                        <p class="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">{{ pkg.description }}</p>

                        <!-- Footer -->
                        <div class="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                            <div class="flex flex-col flex-grow">
                                <span class="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{{ t('packages.price') }}</span>
                                <div class="flex items-baseline gap-2">
                                    <span class="text-xl font-black text-secondary font-display italic leading-none">{{ formatUSD(pkg.price) }}</span>
                                    <span class="text-[9px] font-bold text-gray-400">/ kishi</span>
                                </div>
                                <span class="text-[9px] font-bold text-emerald-600 leading-none mt-1">{{ formatUZS(pkg.price) }}</span>
                            </div>
                            <div class="flex gap-2 w-full sm:w-auto">
                                <RouterLink 
                                    :to="`/packages/${pkg._id}`" 
                                    class="flex-1 sm:flex-none text-center bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                                >
                                    {{ t('packages.details') }}
                                </RouterLink>
                                <button 
                                    @click="handleBook(pkg)"
                                    class="flex-1 sm:flex-none bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
                                >
                                    {{ t('packages.order') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="text-center mt-12">
             <RouterLink to="/tours" class="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition border-b-2 border-primary pb-0.5">
                {{ t('packages.seeAll') }} <span>→</span>
             </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useCurrency } from '../composables/useCurrency'

const { t } = useI18n()
const { formatUZS, formatUSD } = useCurrency()

const calculateDuration = (start, end) => {
    if (!start || !end) return 7
    const s = new Date(start)
    const e = new Date(end)
    const diffTime = Math.abs(e - s)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

defineProps({
    featuredPackages: Array,
    handleBook: Function
})
</script>
