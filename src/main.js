import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50
})

app.mount('#app')
