```vue
<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  scrollToTours: Function,
  searchQuery: String,
  searchDate: String,
  searchResults: Array,
  isSearchModalOpen: Boolean,
  searchPackages: Function,
  closeSearchModal: Function,
  handleBook: Function
})

const emit = defineEmits(['update:searchQuery', 'update:searchDate'])

const { t } = useI18n()

const handleExplore = () => {
    if (props.searchQuery || props.searchDate) {
        props.searchPackages()
    } else {
        props.scrollToTours()
    }
}
</script>

<template>
  <div class="relative min-h-[100dvh] md:h-[700px] flex items-center justify-center overflow-hidden py-12 md:py-0">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img 
        src="https://sc01.alicdn.com/kf/H26d854569f6b4200a7fc3efdab540e7eU/234072056/H26d854569f6b4200a7fc3efdab540e7eU.jpg" 
        alt="Travel Background" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-black/30"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container mx-auto px-4 text-center text-white pt-16 md:pt-0">
        <h1 class="text-2xl sm:text-3xl md:text-6xl font-black mb-6 leading-tight" data-aos="fade-down" data-aos-delay="100">
          {{ t('hero.title') }}
        </h1>
        
        <p class="text-sm sm:text-base md:text-xl text-white/90 mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          {{ t('hero.subtitle') }}
        </p>

        <!-- Search / Filter Card -->
        <div class="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-2xl" data-aos="zoom-in" data-aos-delay="300">
           <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <!-- Destination Input -->
              <div class="md:col-span-5 text-left">
                 <label class="block text-gray-500 text-xs font-bold uppercase mb-1 ml-1">{{ t('hero.searchLabel') }}</label>
                 <div class="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
                    <span class="text-gray-400 mr-2">📍</span>
                    <input 
                      :value="searchQuery"
                      @input="$emit('update:searchQuery', $event.target.value)"
                      type="text" 
                      :placeholder="t('hero.searchPlaceholder')" 
                      class="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 font-medium"
                    >
                 </div>
              </div>

              <!-- Date Input -->
              <div class="md:col-span-4 text-left">
                 <label class="block text-gray-500 text-xs font-bold uppercase mb-1 ml-1">{{ t('hero.dateLabel') }}</label>
                 <div class="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
                    <span class="text-gray-400 mr-2">📅</span>
                    <input 
                      :value="searchDate"
                      @input="$emit('update:searchDate', $event.target.value)"
                      type="date" 
                      class="w-full bg-transparent outline-none text-gray-800 font-medium"
                    >
                 </div>
              </div>

              <!-- Search Button -->
              <div class="md:col-span-3">
                 <button 
                  @click="handleExplore"
                  class="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-secondary/50 transform active:scale-95 flex items-center justify-center gap-2"
                 >
                    <span>🔍</span> {{ t('hero.searchBtn') }}
                 </button>
              </div>
           </div>
        </div>

        <!-- Social Proof / Trust Badges -->
        <div class="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 text-white/80" data-aos="fade-up" data-aos-delay="400">
           <div class="flex items-center gap-3 group">
              <span class="text-3xl group-hover:scale-125 transition-transform duration-300">🌍</span>
              <div class="text-left">
                 <span class="block text-2xl font-bold text-white">50+</span>
                 <span class="text-xs uppercase tracking-wider">{{ t('hero.stats.countries') }}</span>
              </div>
           </div>
           <div class="flex items-center gap-3 group">
              <span class="text-3xl group-hover:scale-125 transition-transform duration-300">👥</span>
              <div class="text-left">
                 <span class="block text-2xl font-bold text-white">10k+</span>
                 <span class="text-xs uppercase tracking-wider">{{ t('hero.stats.tourists') }}</span>
              </div>
           </div>
           <div class="flex items-center gap-3 group">
              <span class="text-3xl group-hover:scale-125 transition-transform duration-300">🛡️</span>
              <div class="text-left">
                 <span class="block text-2xl font-bold text-white">24/7</span>
                 <span class="text-xs uppercase tracking-wider">{{ t('hero.stats.support') }}</span>
              </div>
           </div>
        </div>
    </div>
    
    <!-- Search Results Modal -->
    <div v-if="isSearchModalOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-md" @click="closeSearchModal"></div>
        <div class="relative bg-white rounded-[1.5rem] sm:rounded-[2rem] w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in-up">
            <div class="p-5 sm:p-8">
                <div class="flex justify-between items-start sm:items-center mb-6 sm:mb-8">
                    <div>
                        <h3 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-display italic leading-tight">{{ t('search.resultsTitle') }}</h3>
                        <p v-if="searchResults.length === 0" class="text-sm sm:text-base text-gray-400 font-medium mt-1">{{ t('search.noResults') }}</p>
                    </div>
                    <button @click="closeSearchModal" class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-all duration-300 text-gray-400 hover:text-gray-900 ml-4 flex-shrink-0">✕</button>
                </div>

                <div v-if="searchResults.length === 0" class="text-center py-12 sm:py-20 px-6">
                    <div class="text-5xl sm:text-6xl mb-6">🔍</div>
                    <h4 class="text-lg sm:text-xl font-bold text-gray-900 mb-2">{{ t('search.noResults') }}</h4>
                    <p class="text-sm sm:text-base text-gray-500 mb-8">{{ t('search.recommendations') }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                    <div v-for="pkg in searchResults" :key="pkg._id" class="group bg-gray-50 rounded-2xl sm:rounded-3xl overflow-hidden hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100 p-3 sm:p-4 flex flex-col xs:flex-row gap-4 sm:gap-6">
                        <div class="w-full xs:w-28 sm:w-32 h-40 xs:h-28 sm:h-32 flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl">
                           <img :src="pkg.image" :alt="pkg.title" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700">
                        </div>
                        <div class="flex flex-col justify-between flex-grow py-1">
                            <div>
                                <div class="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-widest mb-1">
                                    <span>📍</span> {{ pkg.destination }}
                                </div>
                                <h4 class="font-black text-gray-900 text-base sm:text-lg leading-tight mb-2 font-display italic">{{ pkg.title }}</h4>
                            </div>
                            <div class="flex items-center justify-between mt-2 xs:mt-0">
                                <span class="text-lg sm:text-xl font-black text-secondary font-display italic tracking-tight">${{ pkg.price }}</span>
                                <button @click="handleBook(pkg); closeSearchModal()" class="text-[10px] font-black text-primary uppercase tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary transition-all pb-0.5 ml-2">
                                    {{ t('packages.details') }}
                                </button>
                            </div>
                        </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.delay-100 { animation-delay: 0.1s; }
.delay-200 { animation-delay: 0.2s; }
.delay-300 { animation-delay: 0.3s; }
</style>

