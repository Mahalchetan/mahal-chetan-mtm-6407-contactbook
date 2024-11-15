import { createRouter, createWebHistory } from 'vue-router'
import StartView from './views/StartView.vue'
import ContactDetailsView from './views/ContactDetailsView.vue'
import NewContactView from './views/Newcontactview.vue'
import AboutView from './views/AboutView.vue'

const routes = [
  { path: '/', name: 'start', component: StartView },
  { path: '/contact/:id', name: 'contact-details', component: ContactDetailsView, props: true },
  { path: '/new', name: 'new-contact', component: NewContactView },
  { path: '/about', name: 'about', component: AboutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
