import { createI18n } from 'vue-i18n'
import uz from './locales/uz.json'
import uzCyrl from './locales/uz-cyrl.json'
import ru from './locales/ru.json'
import en from './locales/en.json'

const i18n = createI18n({
    legacy: false, // Use Composition API
    locale: 'uz-cyrl', // Default locale (O'zbek Kirill - seems to be the primary one used in the earlier code)
    fallbackLocale: 'uz-cyrl',
    messages: {
        'uz': uz,
        'uz-cyrl': uzCyrl,
        'ru': ru,
        'en': en
    }
})

export default i18n
