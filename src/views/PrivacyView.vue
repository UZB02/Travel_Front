<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans bg-surface">
    <Navbar />
    
    <main class="flex-grow container mx-auto px-6 py-32">
        <h1 class="text-4xl font-bold mb-8 text-secondary">Privacy Policy</h1>
        
        <div class="prose max-w-none text-gray-600 space-y-4">
            <p>Last updated: {{ new Date().toLocaleDateString() }}</p>

            <h2 class="text-2xl font-semibold text-primary mt-8">1. Introduction</h2>
            <p>Welcome to Travel. We respect your privacy and are committed to protecting your personal data.</p>

            <h2 class="text-2xl font-semibold text-primary mt-8">2. Data We Collect</h2>
            <p>We may collect personal information such as your name, phone number, and email address when you book a tour or contact us.</p>

            <h2 class="text-2xl font-semibold text-primary mt-8">3. How We Use Your Data</h2>
            <p>We use your data to process bookings, communicate with you, and improve our services.</p>

            <h2 class="text-2xl font-semibold text-primary mt-8">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at info@travel.uz.</p>
        </div>
    </main>

    <Footer />
  </div>
</template>
