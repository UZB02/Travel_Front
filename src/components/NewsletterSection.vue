<template>
    <!-- Cinematic Newsletter -->
    <section class="py-40 relative overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-[#003B95]">
         <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed"></div>
         <!-- Sophisticated Orbs -->
         <div class="absolute top-0 left-0 w-[1000px] h-[1000px] bg-[#FFA500]/20 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
         <div class="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-400/20 rounded-full blur-[120px]"></div>
      </div>
      
      <div class="container mx-auto px-6 relative z-10 text-center" data-aos="fade-up">
         <span class="text-[#FFA500] font-black uppercase tracking-[0.5em] text-[10px] block mb-6 animate-fade-in">Transmission Hub</span>
         <h2 class="text-6xl md:text-8xl font-black text-white mb-10 font-display italic tracking-tighter drop-shadow-2xl">
            Join the <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-[#FFA500]">Elite.</span>
         </h2>
         <p class="text-blue-100/70 text-xl font-medium italic mb-14 max-w-2xl mx-auto">Intercept exclusive dossiers and limited-run expeditions before they vanish into the void.</p>
         
         <form @submit.prevent class="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto bg-white/5 backdrop-blur-3xl p-3 rounded-[3rem] border border-white/10 shadow-2xl">
            <input type="email" placeholder="Signal Address Vault..." class="flex-1 bg-transparent text-white placeholder-blue-200/50 px-10 py-6 rounded-[2.5rem] outline-none font-black text-xs uppercase tracking-widest">
            <button class="bg-white text-[#003B95] hover:bg-[#FFA500] hover:text-white px-14 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 transform hover:scale-105 active:scale-95">
              Unlock Access
            </button>
         </form>
      </div>
    </section>
</template>

<style scoped>
.font-display {
    font-family: 'Outfit', sans-serif;
}
.animate-fade-in {
    animation: fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>

