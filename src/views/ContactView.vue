<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
    name: '',
    email: '',
    message: ''
})

const isSending = ref(false)

const handleContact = () => {
    isSending.value = true
    setTimeout(() => {
        alert(`${t('contact.form.sending')} ${form.name}!`)
        isSending.value = false
        form.name = ''
        form.email = ''
        form.message = ''
    }, 1500)
}
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans selection:bg-[#FFA500] selection:text-white bg-[#F1F5F9]">
    <Navbar />

    <!-- Premium Header -->
    <section class="relative pt-48 pb-32 bg-[#0B1120] overflow-hidden text-center">
        <div class="absolute inset-0">
             <div class="absolute inset-0 bg-[#003B95]/5 mix-blend-overlay"></div>
             <div class="absolute top-[-40%] left-[-10%] w-full h-full bg-[#003B95]/20 rounded-full blur-[120px] animate-pulse"></div>
        </div>
        <div class="relative z-10 container mx-auto px-6">
            <span class="text-[#FFA500] font-black uppercase tracking-[0.4em] text-[10px] block mb-4" data-aos="fade-down">{{ t('contact.header.label') }}</span>
            <h1 class="text-6xl md:text-8xl font-black text-white mb-6 font-display italic tracking-tighter" data-aos="zoom-in" data-aos-delay="200">{{ t('contact.header.title') }} <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#FFA500]">{{ t('contact.header.titleHighlight') }}</span></h1>
            <p class="text-xl md:text-2xl text-white/60 font-medium italic max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400">{{ t('contact.header.subtitle') }}</p>
        </div>
    </section>

    <!-- Contact Form Section -->
    <section class="py-24 relative flex-grow">
      <div class="container mx-auto px-6">
          <div class="max-w-6xl mx-auto bg-white rounded-[3.5rem] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col lg:flex-row border border-white">
              <!-- Info Side -->
              <div class="w-full lg:w-2/5 bg-[#0B1120] p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden" data-aos="fade-right">
                  <div class="absolute top-0 right-0 w-64 h-64 bg-[#FFA500]/10 rounded-full blur-[80px]"></div>
                  
                  <div class="space-y-12 relative z-10">
                      <div>
                          <span class="text-[#FFA500] font-black uppercase tracking-widest text-xs block mb-2">{{ t('contact.info.connect') }}</span>
                          <h3 class="text-4xl font-black font-display italic tracking-tight">{{ t('contact.info.title') }}</h3>
                      </div>

                      <div class="space-y-8">
                          <div class="flex items-start gap-6 group">
                              <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-[#FFA500] group-hover:text-[#0B1120] transition duration-500">📍</div>
                              <div>
                                  <h4 class="font-black text-xs uppercase tracking-widest mb-1">{{ t('contact.info.hq.title') }}</h4>
                                  <p class="text-gray-400 font-medium italic">{{ t('contact.info.hq.val') }}</p>
                              </div>
                          </div>
                          <div class="flex items-start gap-6 group">
                              <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-[#FFA500] group-hover:text-[#0B1120] transition duration-500">📞</div>
                              <div>
                                  <h4 class="font-black text-xs uppercase tracking-widest mb-1">{{ t('contact.info.phone.title') }}</h4>
                                  <p class="text-gray-400 font-medium italic">{{ t('contact.info.phone.val') }}</p>
                              </div>
                          </div>
                          <div class="flex items-start gap-6 group">
                              <div class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-[#FFA500] group-hover:text-[#0B1120] transition duration-500">✉️</div>
                              <div>
                                  <h4 class="font-black text-xs uppercase tracking-widest mb-1">{{ t('contact.info.email.title') }}</h4>
                                  <p class="text-gray-400 font-medium italic">{{ t('contact.info.email.val') }}</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div class="mt-20 flex gap-6 relative z-10">
                       <a href="#" class="text-xs font-black uppercase tracking-widest text-[#FFA500] hover:text-white transition">Instagram</a>
                       <a href="#" class="text-xs font-black uppercase tracking-widest text-[#FFA500] hover:text-white transition">X / Twitter</a>
                       <a href="#" class="text-xs font-black uppercase tracking-widest text-[#FFA500] hover:text-white transition">Facebook</a>
                  </div>
              </div>

              <!-- Input Side -->
              <div class="w-full lg:w-3/5 p-12 md:p-16" data-aos="fade-left">
                  <form @submit.prevent="handleContact" class="space-y-8">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div class="space-y-2">
                              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">{{ t('contact.form.nameLabel') }}</label>
                              <input v-model="form.name" type="text" required class="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-bold text-[#0B1120]" :placeholder="t('contact.form.namePlaceholder')">
                          </div>
                          <div class="space-y-2">
                              <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">{{ t('contact.form.emailLabel') }}</label>
                              <input v-model="form.email" type="email" required class="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-bold text-[#0B1120]" :placeholder="t('contact.form.emailPlaceholder')">
                          </div>
                      </div>
                      <div class="space-y-2">
                          <label class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">{{ t('contact.form.messageLabel') }}</label>
                          <textarea v-model="form.message" rows="5" required class="w-full px-8 py-5 rounded-[2.5rem] bg-gray-50 border-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-medium text-gray-600 italic resize-none" :placeholder="t('contact.form.messagePlaceholder')"></textarea>
                      </div>
                      <button type="submit" :disabled="isSending" class="bg-[#003B95] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/30 hover:bg-[#FFA500] transition-all duration-500 transform hover:-translate-y-1 active:scale-95 disabled:opacity-50">
                          {{ isSending ? t('contact.form.sending') : t('contact.form.submit') }}
                      </button>
                  </form>
              </div>
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
    animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>

