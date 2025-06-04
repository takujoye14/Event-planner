<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Log In</h1>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p>
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin() {
      this.errorMessage = "";
      try {
        const response = await fetch(`http://localhost:3000/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: this.email, password: this.password })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          this.errorMessage = errorData?.message || "Login failed. Please check your credentials.";
          return;
        }

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        this.$router.push("/events");
      } catch (error) {
        this.errorMessage = "An error occurred during login. Please try again later.";
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0d0d1a;
}

.login-card {
  background: #1e1e2f;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  color: #f0f0f0;
  width: 320px;
}

.login-card h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #f1c40f;
  color: #1e1e2f;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #e1b40d;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
