<template>
  <div class="register-page">
    <div class="register-card">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <input type="text" v-model="name" placeholder="Name" required />
        </div>
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="Password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async handleRegister() {
      this.errorMessage = "";
      try {
        const response = await fetch(`http://localhost:3000/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password
          })
        });

        const contentType = response.headers.get("content-type");
        let responseData = {};

        if (contentType && contentType.includes("application/json")) {
          responseData = await response.json();
        }

        if (!response.ok) {
          this.errorMessage = responseData?.error || "Registration failed. Please try again.";
          return;
        }

        this.$router.push("/login");
      } catch (error) {
        console.error("Registration error:", error);
        this.errorMessage = "An error occurred during registration. Please try again later.";
      }
    }
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0d0d1a;
}

.register-card {
  background: #1e1e2f;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  color: #f0f0f0;
  width: 320px;
}

.register-card h1 {
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
