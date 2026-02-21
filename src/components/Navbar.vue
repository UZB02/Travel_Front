<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isLangMenuOpen = ref(false)

const languages = [
  { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
  { code: 'uz-cyrl', name: 'Ўзбек', flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
]

const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

const changeLanguage = (langCode) => {
  locale.value = langCode
  isLangMenuOpen.value = false
  localStorage.setItem('user-locale', langCode)
}

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  const savedLocale = localStorage.getItem('user-locale')
  if (savedLocale && languages.find(l => l.code === savedLocale)) {
    locale.value = savedLocale
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const navLinks = computed(() => [
  { name: t('nav.hotTours'), to: '/#hot-tours' },
  { name: t('nav.payment'), to: '/#payment' },
  { name: t('nav.about'), to: '/about' },
  { name: t('nav.services'), to: '/#services' },
  { name: t('nav.tours'), to: '/tours' },
  { name: t('nav.contacts'), to: '/contact' }
])
</script>

<template>
  <nav 
    class="fixed w-full z-50 transition-all duration-300"
    :class="[isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4']"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <span class="text-xl md:text-2xl font-black italic tracking-tighter" :class="[isScrolled ? 'text-primary' : 'text-white']">
            Travel
          </span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-4 xl:gap-6">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.to"
            class="text-sm font-medium transition-colors hover:text-secondary whitespace-nowrap"
            :class="[isScrolled ? 'text-gray-700' : 'text-white/90']"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <!-- Right Side: Language & Contacts -->
        <div class="hidden md:flex items-center gap-4">
          <!-- Language Switcher -->
          <div class="relative">
            <button 
              @click="isLangMenuOpen = !isLangMenuOpen"
              class="flex items-center gap-1 text-sm font-bold px-2 py-1 rounded transition-colors"
              :class="[isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10']"
            >
              <span>{{ currentLanguage.flag }}</span>
              <span class="uppercase">{{ currentLanguage.code.split('-')[0] }}</span>
              <span class="text-xs ml-1">▼</span>
            </button>

            <!-- Dropdown -->
            <div 
              v-if="isLangMenuOpen"
              class="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-xl py-2 border border-gray-100 overflow-hidden"
            >
              <button 
                v-for="lang in languages" 
                :key="lang.code"
                @click="changeLanguage(lang.code)"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary flex items-center gap-2"
                :class="{'bg-blue-50 text-primary': locale === lang.code}"
              >
                <span>{{ lang.flag }}</span>
                <span>{{ lang.name }}</span>
              </button>
            </div>
          </div>

          <a href="tel:+998785557788" class="font-bold whitespace-nowrap text-sm" :class="[isScrolled ? 'text-primary' : 'text-white']">
            +998 78 555 77 88
          </a>
          <button class="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-lg whitespace-nowrap">
            {{ t('nav.requestCall') }}
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="flex items-center gap-4 md:hidden">
            <!-- Mobile Lang Switcher -->
            <button 
              @click="changeLanguage(locale === 'uz' ? 'uz-cyrl' : locale === 'uz-cyrl' ? 'ru' : locale === 'ru' ? 'en' : 'uz')"
              class="text-sm font-bold px-2 py-1 rounded border"
              :class="[isScrolled ? 'text-gray-700 border-gray-200' : 'text-white border-white/30']"
            >
              {{ currentLanguage.flag }} {{ currentLanguage.code.split('-')[0].toUpperCase() }}
            </button>

            <button 
            @click="toggleMobileMenu"
            class="p-2 rounded-lg"
            :class="[isScrolled ? 'text-gray-700' : 'text-white']"
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t"
      >
        <div class="flex flex-col p-4 gap-2">
          <RouterLink 
            v-for="link in navLinks" 
            :key="link.name"
            :to="link.to"
            @click="isMobileMenuOpen = false"
            class="py-2 text-gray-700 hover:text-primary font-medium border-b border-gray-100 last:border-0"
          >
            {{ link.name }}
          </RouterLink>
          <div class="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
            <a href="tel:+998785557788" class="text-primary font-bold text-center">
              +998 78 555 77 88
            </a>
            <button class="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-lg font-semibold w-full">
              {{ t('nav.requestCall') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

