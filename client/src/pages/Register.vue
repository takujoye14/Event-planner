<template>
  <div class="card">
    <h4 class="title">Register</h4>
    <form @submit.prevent="register">
      <div class="field">
        <span class="icon">👤</span>
        <input v-model="name" type="text" placeholder="Name" class="input-field" required />
      </div>
      <div class="field">
        <span class="icon">📧</span>
        <input v-model="email" type="email" placeholder="Email" class="input-field" required />
      </div>
      <div class="field">
        <span class="icon">🔒</span>
        <input v-model="password" type="password" placeholder="Password" class="input-field" required />
      </div>
      <button class="btn" type="submit">Register</button>
      <router-link to="/login" class="btn-link">Already have an account? Login</router-link>
    </form>
    <p v-if="error" style="color: red; margin-top: 10px">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        const res = await fetch('http://localhost:3000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.name, email: this.email, password: this.password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Registration failed');

        localStorage.setItem('user', JSON.stringify(data.user));
        this.$router.push('/');
      } catch (err) {
        this.error = err.message;
      }
    }
  }
};
</script>

<style scoped>
@import '../styles/auth-card.css'; /* reuse common card styling */
</style>
