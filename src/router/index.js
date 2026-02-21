import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/tours',
            name: 'tours',
            component: () => import('../views/ToursView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import('../views/ContactView.vue')
        },
        {
            path: '/packages/:id',
            name: 'package-details',
            component: () => import('../views/PackageDetailsView.vue')
        },
        {
            path: '/privacy',
            name: 'privacy',
            component: () => import('../views/PrivacyView.vue')
        },

    ]
})

export default router
