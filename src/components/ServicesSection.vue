<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUIEffects } from '../composables/useUIEffects'

const { t } = useI18n()
const { handleTilt, resetTilt } = useUIEffects()

const services = computed(() => [
  {
    title: t('services.items.types'),
    description: t('services.items.typesDesc'),
    icon: '🌍'
  },
  {
    title: t('services.items.transport'),
    description: t('services.items.transportDesc'),
    icon: '✈️'
  },
  {
    title: t('services.items.accommodation'),
    description: t('services.items.accommodationDesc'),
    icon: '🏨'
  },
  {
    title: t('services.items.visas'),
    description: t('services.items.visasDesc'),
    icon: '📝'
  },
  {
    title: t('services.items.insurance'),
    description: t('services.items.insuranceDesc'),
    icon: '🛡️'
  }
])
</script>

<template>
    <section id="services" class="py-24 bg-surface relative overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-16 reveal">
          <span class="text-primary font-bold uppercase tracking-widest text-xs block mb-4">{{ t('services.title') }}</span>
          <h3 class="text-4xl md:text-5xl font-bold text-gray-900">
            {{ t('services.subtitle') }}
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div 
             v-for="(service, index) in services" 
             :key="index"
             class="group bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden hover:-translate-y-2 perspective-1000"
             @mousemove="handleTilt"
             @mouseleave="resetTilt"
             data-aos="fade-up"
             :data-aos-delay="index * 100"
           >
             <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-all duration-500 group-hover:bg-primary/10"></div>
             
             <div class="relative z-10">
                <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition duration-500">
                   {{ service.icon }}
                </div>
                <h4 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">{{ service.title }}</h4>
                <p class="text-gray-500 leading-relaxed text-sm">{{ service.description }}</p>
             </div>
           </div>
        </div>
      </div>
    </section>
</template>

<style scoped>
.font-display {
    font-family: 'Outfit', sans-serif;
}
</style>

<style scoped>
.font-display {
    font-family: 'Outfit', sans-serif;
}
</style>

