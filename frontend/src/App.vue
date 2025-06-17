<template>
  <div id="app">
    <Header :user="user" @logout="logout" />
    <main class="main-content">
      <router-view @login-success="onLoginSuccess" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      user: null
    };
  },
  mounted() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
    }
  },
  methods: {
    onLoginSuccess(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout() {
      localStorage.removeItem('user');
      this.user = null;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #101010, #181818);
  color: #f0f0f0;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header and Footer Styling (optional) */
header, footer {
  background-color: rgba(20, 20, 20, 0.9);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

/* Main Content Area */
main {
  flex: 1;
  padding: 2rem;
  background: transparent;
}

/* Modern Buttons */
button {
  background-color: #2b2b3e;
  color: #f0f0f0;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  background-color: #ffcc00;
  color: #1e1e2f;
}
</style>