<template>
  <div v-if="user && user._id" class="profile-page">
    <h1>{{ user.name }}'s Profile</h1>
    <p><strong>Email:</strong> {{ user.email }}</p>

    <h2>My RSVPs</h2>
    <div v-if="events.length > 0" class="events-grid">
      <div v-for="event in events" :key="event.id" class="event-card">
        <div class="event-details">
          <h2 class="event-title">{{ event.short_title || event.name }}</h2>
          <p class="event-meta">📅 {{ formatDate(event.datetime_local || event.visible_at) }}</p>
          <p class="event-meta">📍 {{ event.venue?.name || 'Venue TBD' }}</p>
          <p class="event-meta">🎭 {{ event.type || 'Event' }}</p>
          <p class="rsvp-status">🎟️ Status: {{ getRsvpStatus(event.id) }}</p>
          <a :href="event.url || '#'" target="_blank" rel="noopener noreferrer" class="event-button">View Tickets</a>
        </div>
      </div>
    </div>
    <p v-else>No RSVPs yet.</p>

    <h2>Following</h2>
    <ul>
      <li v-for="fid in following" :key="fid">
        {{ getUserNameById(fid) }}
        <button @click="unfollow(fid)">Unfollow</button>
      </li>
    </ul>

    <h2>Followers</h2>
    <ul>
      <li v-for="fid in followers" :key="fid">
        {{ getUserNameById(fid) }}
      </li>
    </ul>

    <h2>Find Users to Follow</h2>
    <div class="search-container" @click.stop>
      <input
        v-model="searchTerm"
        placeholder="Search by name or email..."
        @focus="showDropdown = true"
        @input="showDropdown = true"
      />
      <ul v-if="showDropdown && filteredUsers.length > 0" class="dropdown">
        <li
          v-for="u in filteredUsers"
          :key="u._id"
          v-if="user && u._id !== user._id && !following.includes(u._id)"
          class="dropdown-item"
        >
          <span>{{ u.name || 'Unnamed' }} ({{ u.email || 'No email' }})</span>
          <button @click="follow(u._id)">Follow</button>
        </li>
      </ul>
    </div>
  </div>

  <div v-else class="profile-page">
    <p>Loading profile...</p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    console.log("👤 user from localStorage:", storedUser);
    console.log("🧠 parsed user:", parsedUser);

    return {
      user: parsedUser,
      rsvps: [],
      events: [],
      followers: [],
      following: [],
      allUsers: [],
      searchTerm: "",
      showDropdown: false,
    };
  },
  computed: {
    filteredUsers() {
      if (!this.user || !this.user._id) return []; // 🛡️ Prevents crash
      return this.allUsers.filter(u => {
        if (!u || !u._id || u._id === this.user._id || this.following.includes(u._id)) return false;
        const name = (u.name || "").toLowerCase();
        const email = (u.email || "").toLowerCase();
        return name.includes(this.searchTerm.toLowerCase()) ||
              email.includes(this.searchTerm.toLowerCase());
      });
    }
  },

  methods: {
    hideDropdownOutside() {
      this.showDropdown = false;
    },
    formatDate(date) {
      if (!date) return "Date not available";
      const d = new Date(date);
      return d.toDateString();
    },
    getRsvpStatus(eventId) {
      const rsvp = this.rsvps.find(r => r.eventId === eventId);
      return rsvp?.status || "Unknown";
    },
    getUserNameById(id) {
      const user = this.allUsers.find(u => u._id === id);
      return user && user.name ? user.name : "Unknown";
    },
    async fetchRSVPs() {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      try {
        const res = await fetch(`${base}/rsvp/user?userId=${this.user._id}`);
        const data = await res.json();
        this.rsvps = data.rsvps || [];

        for (const rsvp of this.rsvps) {
          try {
            const eventRes = await fetch(`${base}/events/event/${rsvp.eventId}`);
            const eventData = await eventRes.json();
            if (eventData.event) {
              this.events.push(eventData.event);
            }
          } catch (err) {
            console.warn(`⚠️ Failed to load event ${rsvp.eventId}`, err);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching RSVPs:", err);
      }
    },
    async fetchFollowersAndFollowing() {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      try {
        const [followersRes, followingRes] = await Promise.all([
          fetch(`${base}/users/followers?userId=${this.user._id}`),
          fetch(`${base}/users/following?userId=${this.user._id}`)
        ]);
        const followersData = await followersRes.json();
        const followingData = await followingRes.json();
        this.followers = followersData.followers || [];
        this.following = followingData.following || [];
      } catch (err) {
        console.error("❌ Error fetching followers/following:", err);
      }
    },
    async fetchAllUsers() {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      try {
        const res = await fetch(`${base}/users/allUsers`);
        const data = await res.json();
        this.allUsers = data.users || [];
      } catch (err) {
        console.error("❌ Error fetching all users:", err);
      }
    },
    async follow(targetId) {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      try {
        await fetch(`${base}/users/follow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerId: this.user._id, followeeId: targetId })
        });
        await this.fetchFollowersAndFollowing();
      } catch (err) {
        console.error("❌ Error following user", err);
      }
    },
    async unfollow(targetId) {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
      try {
        await fetch(`${base}/users/unfollow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ followerId: this.user._id, followeeId: targetId })
        });
        await this.fetchFollowersAndFollowing();
      } catch (err) {
        console.error("❌ Error unfollowing user", err);
      }
    }
  },
  async mounted() {
    if (!this.user || !this.user._id) {
      console.warn("⚠️ No valid user found");
      return;
    }

    document.addEventListener("click", this.hideDropdownOutside);
    await this.fetchAllUsers();
    await this.fetchRSVPs();
    await this.fetchFollowersAndFollowing();
  },
  beforeUnmount() {
    document.removeEventListener("click", this.hideDropdownOutside);
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  color: #f0f0f0;
}
h1, h2 {
  color: #ffcc00;
  margin-bottom: 1rem;
}
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.event-card {
  background: #1e1e2f;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  transition: transform 0.3s, box-shadow 0.3s;
}
.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
}
.event-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #ffffff;
}
.event-meta {
  font-size: 0.95rem;
  color: #cccccc;
  margin-bottom: 0.5rem;
}
.rsvp-status {
  font-weight: bold;
  color: #ffcc00;
  margin-top: 0.5rem;
}
.event-button {
  display: inline-block;
  background-color: #ffcc00;
  color: #1e1e2f;
  text-decoration: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s;
  margin-top: 1rem;
}
.event-button:hover {
  background-color: #e1b40d;
}
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}
.search-container input {
  padding: 0.7rem;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background-color: #fff;
  color: #000;
}
.dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background-color: #1e1e2f;
  border: 1px solid #444;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  padding: 0;
  margin: 0.3rem 0 0;
  list-style: none;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}
.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #333;
  color: #fff;
  transition: background-color 0.2s;
}
.dropdown-item:hover {
  background-color: #2a2a3d;
}
.dropdown-item button {
  background-color: #ffcc00;
  color: #1e1e2f;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.dropdown-item button:hover {
  background-color: #e1b40d;
}
button {
  margin-left: 0.5rem;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  background-color: #ffcc00;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background-color: #e1b40d;
}
</style>
