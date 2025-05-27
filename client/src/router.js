import { createRouter, createWebHistory } from 'vue-router'
import Events from './pages/Events.vue'
import RSVP from './pages/RSVP.vue'
import Login from './pages/Login.vue'
import CreateEvent from './pages/CreateEvent.vue'
import Recommendations from './pages/Recommendations.vue'
import Register from './pages/Register.vue';


const routes = [
  { path: '/', component: Events },
  { path: '/rsvp', component: RSVP },
  { path: '/login', component: Login },
  { path: '/create', component: CreateEvent },
  { path: '/register', component: Register },
  { path: '/recommend', component: Recommendations }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('user');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router
