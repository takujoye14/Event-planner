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

      <!-- Notification Bell -->
      <div v-if="user" class="notification-container" @click="toggleNotifications">
        <span class="bell">🔔</span>
        <span v-if="hasUnread" class="badge">{{ notifications.length }}</span>

        <!-- Dropdown -->
        <div v-if="showNotifications" class="notification-dropdown">
          <div
            v-if="notifications.length"
            v-for="(note, index) in notifications"
            :key="index"
            class="notification-item"
          >
            <div>{{ note.message || '📨 You have a new notification' }}</div>
            <div class="timestamp">{{ formatTimestamp(note.timestamp) }}</div>
          </div>
          <p v-else class="empty">No notifications</p>
        </div>
      </div>

      <!-- User Menu -->
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
      showDropdown: false,
      showNotifications: false,
      notifications: [],
      hasUnread: false,
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
      this.showDropdown = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications;
      if (this.showNotifications) {
        this.hasUnread = false; // Mark as read when opened
      }
    },
    async fetchNotifications() {
      if (!this.user || !this.user._id) return;

      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
      const url = `${base}/notifications/${this.user._id}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        this.notifications = data.notifications || [];
        this.hasUnread = this.notifications.length > 0; // Show badge if we have notifications
      } catch (err) {
        console.error('❌ Failed to load notifications:', err);
      }
    },
    formatTimestamp(timestamp) {
      if (!timestamp) return '';
      const now = Date.now();
      const diff = Math.floor((now - timestamp) / 1000);
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      if (diff < 60) return rtf.format(-diff, 'second');
      if (diff < 3600) return rtf.format(-Math.floor(diff / 60), 'minute');
      if (diff < 86400) return rtf.format(-Math.floor(diff / 3600), 'hour');
      return rtf.format(-Math.floor(diff / 86400), 'day');
    }
  },
  mounted() {
    if (this.user && this.user._id) {
      this.fetchNotifications();
    }
  },
  watch: {
    user(newUser) {
      if (newUser && newUser._id) {
        this.fetchNotifications();
      }
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
.user-menu button {
  font-size: 1rem;
  font-weight: 600;
  color: #ffcc00;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.7rem;
  transition: color 0.3s ease;
}
.user-menu button:hover {
  color: #fff;
}
.user-menu {
  position: relative;
  margin-left: 1rem;
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
.notification-container {
  position: relative;
  cursor: pointer;
}
.bell {
  font-size: 1.5rem;
}
.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: red;
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50%;
}
.notification-dropdown {
  position: absolute;
  right: 0;
  top: 2.5rem;
  background: #1e1e2f;
  color: #fff;
  border: 1px solid #444;
  border-radius: 6px;
  padding: 0.5rem;
  min-width: 250px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}
.notification-item {
  padding: 0.5rem;
  border-bottom: 1px solid #333;
}
.notification-item:last-child {
  border-bottom: none;
}
.empty {
  color: #ccc;
  font-size: 0.9rem;
  text-align: center;
}

.timestamp {
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 2px;
}

</style>