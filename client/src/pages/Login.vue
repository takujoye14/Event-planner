<template>
  <div class="card">
    <h4 class="title">Log In</h4>
    <form @submit.prevent="login">
      <div class="field">
        <span class="input-icon">📧</span>
        <input v-model="email" type="email" placeholder="Email" class="input-field" required />
      </div>
      <div class="field">
        <span class="input-icon">🔒</span>
        <input v-model="password" type="password" placeholder="Password" class="input-field" required />
      </div>
      <button type="submit" class="btn">Login</button>
      <button type="button" class="btn-link" @click="goToRegister">Don't have an account? Register</button>
      <p v-if="error" style="color: red">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      this.error = '';
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        this.$router.push('/events'); // ✅ redirect after login
      } catch (err) {
        this.error = err.message;
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
@import '../styles/auth-card.css';
</style>
