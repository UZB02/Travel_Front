<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section id="payment" class="py-20 bg-white">
    <div class="container mx-auto px-6 text-center">
      <div class="mb-12" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ t('payment.title') }}</h2>
        <p class="text-gray-500 max-w-2xl mx-auto">{{ t('payment.description') }}</p>
      </div>

      <div class="flex flex-wrap justify-center gap-8 md:gap-12 items-center grayscale hover:grayscale-0 transition-all duration-500" data-aos="zoom-in" data-aos-delay="100">
        <!-- Replace with actual logos or text representations if images needed -->
        <div class="flex flex-col items-center gap-2 group cursor-pointer">
            <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition">
                💳
            </div>
            <span class="font-bold text-gray-700 group-hover:text-primary">Click</span>
        </div>
        <div class="flex flex-col items-center gap-2 group cursor-pointer">
            <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition">
                📲
            </div>
            <span class="font-bold text-gray-700 group-hover:text-primary">Payme</span>
        </div>
        <div class="flex flex-col items-center gap-2 group cursor-pointer">
            <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition">
                🏦
            </div>
            <span class="font-bold text-gray-700 group-hover:text-primary">Visa / MasterCard</span>
        </div>
        <div class="flex flex-col items-center gap-2 group cursor-pointer">
            <div class="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:shadow-md group-hover:scale-110 transition">
                💵
            </div>
            <span class="font-bold text-gray-700 group-hover:text-primary">{{ t('payment.cash') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
