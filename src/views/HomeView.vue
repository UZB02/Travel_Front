<script setup>
import { onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import PaymentSection from '../components/PaymentSection.vue'
import FeaturedPackages from '../components/FeaturedPackages.vue'
import BookingModal from '../components/BookingModal.vue'

import { usePackages } from '../composables/usePackages'

import { useUIEffects } from '../composables/useUIEffects'

import { useBooking } from '../composables/useBooking'

// Composables
const { 
  featuredPackages, 
  fetchPackages, 
  searchQuery, 
  searchDate, 
  searchResults, 
  isSearchModalOpen, 
  searchPackages, 
  closeSearchModal 
} = usePackages()

const { scrollToTours, observeElements } = useUIEffects()

const {
    isBookingModalOpen,
    selectedPackage,
    handleBook,
    closeBookingModal
} = useBooking()

onMounted(async () => {
  await fetchPackages()
  // Initialize scroll observer after a slight delay to ensure DOM is ready
  setTimeout(observeElements, 100)
})
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-white bg-surface">
    <Navbar />

    <HeroSection 
      :scrollToTours="scrollToTours"
      :searchQuery="searchQuery"
      :searchDate="searchDate"
      :searchResults="searchResults"
      :isSearchModalOpen="isSearchModalOpen"
      :searchPackages="searchPackages"
      :closeSearchModal="closeSearchModal"
      :handleBook="handleBook"
      @update:searchQuery="val => searchQuery = val"
      @update:searchDate="val => searchDate = val"
    />
    
    <ServicesSection />

    <PaymentSection />
    
    <!-- Pass handleBook to open modal from package cards -->
    <FeaturedPackages :featuredPackages="featuredPackages" :handleBook="handleBook" />
    
    <Footer />

    <BookingModal 
      :isOpen="isBookingModalOpen"
      :packageData="selectedPackage"
      @close="closeBookingModal"
    />
  </div>
</template>


