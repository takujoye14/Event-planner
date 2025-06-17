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
  
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header'
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
  }
  
  nav a {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  nav a:hover {
    color: #ff6600;
  }
  </style>