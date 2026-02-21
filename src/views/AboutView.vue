<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans selection:bg-[#FFA500] selection:text-white bg-[#F1F5F9]">
    <Navbar />

    <!-- Immersive Header -->
    <section class="relative pt-48 pb-32 bg-[#0B1120] overflow-hidden">
        <div class="absolute inset-0">
             <div class="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[#003B95]/20 rounded-full blur-[120px] animate-pulse"></div>
             <div class="absolute bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-[#FFA500]/10 rounded-full blur-[100px]"></div>
        </div>
        <div class="relative z-10 container mx-auto px-6 text-center">
            <span class="text-[#FFA500] font-black uppercase tracking-[0.4em] text-[10px] block mb-4" data-aos="fade-down">{{ t('about.genesis') }}</span>
            <h1 class="text-6xl md:text-8xl font-black text-white mb-10 font-display italic tracking-tighter drop-shadow-2xl" data-aos="zoom-in" data-aos-delay="200">
                {{ t('about.title') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#FFA500]">{{ t('about.titleSuffix') }}</span>
            </h1>
            <p class="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed italic" data-aos="fade-up" data-aos-delay="400">
                {{ t('about.subtitle') }} 
            </p>
        </div>
    </section>

    <!-- Story Section -->
    <section class="py-32 relative">
      <div class="container mx-auto px-6">
          <div class="flex flex-col lg:flex-row gap-20 items-center">
              <div class="w-full lg:w-1/2 relative group" data-aos="fade-right">
                  <div class="absolute -inset-6 bg-[#003B95]/5 rounded-[3rem] transform rotate-3 transition duration-700 group-hover:rotate-0"></div>
                  <div class="relative rounded-[2.5rem] overflow-hidden shadow-2xl transform -rotate-2 transition duration-700 group-hover:rotate-0 border-8 border-white">
                      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80" alt="Team" class="w-full h-full object-cover scale-105 group-hover:scale-100 transition duration-700">
                  </div>
              </div>
              <div class="w-full lg:w-1/2 space-y-8" data-aos="fade-left">
                  <div class="inline-block px-5 py-2 bg-[#003B95]/5 rounded-full">
                      <span class="text-[#003B95] font-black text-[10px] uppercase tracking-widest">{{ t('about.since') }}</span>
                  </div>
                  <h2 class="text-4xl md:text-5xl font-black text-[#0B1120] font-display italic tracking-tighter leading-tight">{{ t('about.mainTitle') }} <span class="text-[#003B95]">{{ t('about.mainTitleHighlight') }}</span>{{ t('about.mainTitleSuffix') }}</h2>
                  <p class="text-lg text-gray-500 font-medium leading-relaxed italic">
                      {{ t('about.description') }}
                  </p>
                  
                  <!-- Premium Stats -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
                       <div class="p-6 bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-50 group hover:-translate-y-2 transition duration-500" data-aos="flip-up" data-aos-delay="0">
                           <div class="text-4xl font-black text-[#0B1120] font-display mb-1 group-hover:text-[#003B95] transition">500+</div>
                           <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest">{{ t('about.stats.expeditions') }}</div>
                       </div>
                       <div class="p-6 bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-50 group hover:-translate-y-2 transition duration-500" data-aos="flip-up" data-aos-delay="100">
                           <div class="text-4xl font-black text-[#0B1120] font-display mb-1 group-hover:text-[#003B95] transition">50+</div>
                           <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest">{{ t('about.stats.ports') }}</div>
                       </div>
                       <div class="p-6 bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-50 group hover:-translate-y-2 transition duration-500" data-aos="flip-up" data-aos-delay="200">
                           <div class="text-4xl font-black text-[#0B1120] font-display mb-1 group-hover:text-[#003B95] transition">98%</div>
                           <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest">{{ t('about.stats.renewal') }}</div>
                       </div>
                  </div>
              </div>
          </div>
      </div>
    </section>

    <!-- Philosphy Section -->
    <section class="py-24 bg-[#0B1120] relative overflow-hidden">
        <div class="container mx-auto px-6 relative z-10">
            <div class="max-w-4xl mx-auto text-center space-y-8">
                <span class="text-[#FFA500] font-black uppercase tracking-[0.4em] text-[10px] block">{{ t('about.philosophy') }}</span>
                <h3 class="text-3xl md:text-5xl font-black text-white font-display italic tracking-tight leading-tight">{{ t('about.quote') }}</h3>
                <div class="w-24 h-1 bg-gradient-to-r from-[#003B95] to-[#FFA500] mx-auto rounded-full"></div>
            </div>
        </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.font-display {
    font-family: 'Outfit', sans-serif;
}
.animate-fade-in {
    animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>

