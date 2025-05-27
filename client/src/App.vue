<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';

export default {
  components: { Login, Register },
  data() {
    return {
      currentView: 'login',
      user: null
    };
  },
  mounted() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) this.user = JSON.parse(savedUser);
  },
  methods: {
    onLoginSuccess(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      localStorage.removeItem('user');
      this.user = null;
      this.currentView = 'login';
    }
  }
};
</script>


<style>
body {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background: linear-gradient(145deg, #0f0f14, #1f2029);
  color: #fff;
}
</style>