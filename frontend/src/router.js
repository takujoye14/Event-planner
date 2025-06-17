import { createRouter, createWebHistory } from 'vue-router'
import Events from './pages/Events.vue'
import RSVP from './pages/RSVP.vue'
import Login from './pages/Login.vue'
import CreateEvent from './pages/CreateEvent.vue'
import Recommendations from './pages/Recommendations.vue'
import Register from './pages/Register.vue';
import About from './pages/About.vue'
import Home from './pages/Home.vue'
import Contact from './pages/Contact.vue'
import Users from './pages/Users.vue'


const routes = [
  { path: '/events', component: Events },
  { path: '/rsvp', component: RSVP },
  { path: '/login', component: Login },
  { path: '/create', component: CreateEvent },
  { path: '/register', component: Register },
  { path: '/recommend', component: Recommendations },
  { path: '/',  component: Home },
  { path: '/about', component: About},
  { path: '/contact',  component: Contact},
  {path: '/users', component: Users}
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