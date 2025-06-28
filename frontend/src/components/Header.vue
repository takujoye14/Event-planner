<template>
  <header class="header">
    <div class="logo">
      <h1><span class="accent">🎟️</span> MyEventApp</h1>
    </div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/events">Events</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link to="/users">Users</router-link>
      <div v-if="user" class="user-menu">
        <button @click="toggleDropdown">{{ user.name }}</button>
        <div v-if="showDropdown" class="dropdown">
          <router-link to="/profile">My Profile</router-link>
          <a @click="logout">Logout</a>
        </div>
      </div>
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: ['user'],
  data() {
    return {
      showDropdown: false
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
      this.showDropdown = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  }
};
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, #1a1a1a, #333);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.logo h1 {
  font-size: 1.8rem;
  margin: 0;
}

.logo .accent {
  color: #ff6600;
}

nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

nav a, .user-menu button {
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

nav a:hover, .user-menu button:hover {
  color: #ff6600;
}

.user-menu {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 2.5rem;
  right: 0;
  background-color: #1e1e2f;
  border: 1px solid #444;
  padding: 0.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.dropdown a {
  padding: 0.5rem 0;
  color: #f0f0f0;
}

.dropdown a:hover {
  color: #ff6600;
}
</style>