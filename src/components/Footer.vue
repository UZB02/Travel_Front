<template>
  <footer class="bg-[#0B1120] text-white pt-16 pb-8 border-t border-gray-800" data-aos="fade-up">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <!-- Address -->
        <div class="space-y-6">
          <h3 class="text-lg font-bold uppercase tracking-wider text-white border-b-2 border-primary inline-block pb-2">{{ t('footer.addressTitle') }}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">
            {{ t('footer.address') }}
          </p>
          <a href="https://yandex.uz/maps" target="_blank" class="text-primary text-sm font-bold hover:text-white transition">{{ t('footer.map') }} →</a>
        </div>

        <!-- Contacts -->
        <div class="space-y-6">
          <h3 class="text-lg font-bold uppercase tracking-wider text-white border-b-2 border-primary inline-block pb-2">{{ t('footer.contactsTitle') }}</h3>
          <ul class="space-y-4 text-sm text-gray-400">
            <li class="flex items-center gap-3">
               <span class="text-primary">📞</span>
               <a href="tel:+998785557788" class="hover:text-white transition">+998 78 555 77 88</a>
            </li>
            <li class="flex items-center gap-3">
               <span class="text-primary">📧</span>
               <a href="mailto:travel.uz@gmail.com" class="hover:text-white transition">travel.uz@gmail.com</a>
            </li>
          </ul>
        </div>

        <!-- Socials -->
        <div class="space-y-6">
          <h3 class="text-lg font-bold uppercase tracking-wider text-white border-b-2 border-primary inline-block pb-2">{{ t('footer.socialsTitle') }}</h3>
          <div class="flex gap-4">
             <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition duration-300">
                <i class="pi pi-facebook"></i>
             </a>
             <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-600 hover:text-white transition duration-300">
                <i class="pi pi-instagram"></i>
             </a>
             <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-400 hover:text-white transition duration-300">
                <i class="pi pi-telegram"></i>
             </a>
          </div>
        </div>

        <!-- Company Links -->
        <div class="space-y-6">
          <h3 class="text-lg font-bold uppercase tracking-wider text-white border-b-2 border-primary inline-block pb-2">{{ t('footer.companyTitle') }}</h3>
          <ul class="space-y-3 text-sm text-gray-400">
            <li><router-link to="/#payment" class="hover:text-white transition">{{ t('nav.payment') }}</router-link></li>
            <li><router-link to="/about" class="hover:text-white transition">{{ t('nav.about') }}</router-link></li>
            <li><router-link to="/#branches" class="hover:text-white transition">{{ t('footer.branches') }}</router-link></li>
            <li><router-link to="/privacy" class="hover:text-white transition">{{ t('footer.privacy') }}</router-link></li>
          </ul>
        </div>

      </div>

      <!-- Copyright -->
      <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>&copy; 2025 Travel. {{ t('footer.rights') }}</p>
        <p>{{ t('footer.madeWith') }} ❤️</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

