<template>
    <div class="users-page">
      <h1>Explore Users</h1>
  
      <!-- Filter by event type -->
      <div class="filter">
        <label for="eventType">Filter by event type:</label>
        <select id="eventType" v-model="selectedEventType" @change="filterUsers">
          <option value="">All</option>
          <option v-for="type in eventTypes" :key="type">{{ type }}</option>
        </select>
      </div>
  
      <!-- User List -->
      <div class="user-list">
        <div class="user-card" v-for="user in users" :key="user._id">
          <h3>{{ user.username }}</h3>
          <p>Interested in: {{ user.interestedEvents.join(', ') }}</p>
          <button @click="followUser(user._id)">Follow</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Users",
    data() {
      return {
        users: [],
        selectedEventType: '',
        eventTypes: ['Broadway', 'Concerts', 'Sports']
      };
    },
    methods: {
      async fetchUsers() {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      try {
          console.log('🔎 Fetching users from:', `${base}/users`);
          const res = await fetch(`${base}/users`);
          const data = await res.json();
          console.log('✅ Users fetched:', data);
          this.users = data;
      } catch (err) {
          console.error('❌ Error fetching users:', err);
      }
      },
      filterUsers() {
        console.log(`🔎 Filtering by event type: ${this.selectedEventType}`);
        this.fetchUsers();
      },
      async followUser(targetUserId) {
        const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
        const myUserId = 'currentUserId'; // replace with your actual user ID from auth
        const url = `${base}/users/${myUserId}/follow/${targetUserId}`;
        try {
          const res = await fetch(url, { method: 'POST' });
          if (!res.ok) throw new Error('Failed to follow user');
          console.log(`✅ Now following user: ${targetUserId}`);
          alert('Followed successfully!');
        } catch (err) {
          console.error('❌ Error following user:', err);
        }
      }
    },
    mounted() {
      this.fetchUsers();
    }
  };
  </script>
  
  <style scoped>
  .users-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    color: #f0f0f0;
  }
  
  .filter {
    margin-bottom: 1.5rem;
  }
  
  .user-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .user-card {
    background: #1e1e2f;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
    transition: transform 0.3s;
  }
  
  .user-card:hover {
    transform: translateY(-5px);
  }
  </style>