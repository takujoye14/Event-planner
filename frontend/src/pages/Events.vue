<template>
  <div class="events-page">
    <h1 class="page-title">Discover Events</h1>

    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
    </div>

    <!-- Filter Buttons -->
    <div class="filter-buttons">
      <button
        v-for="category in Object.keys(categories)"
        :key="category"
        @click="selectCategory(category)"
        :class="{ active: selectedCategory === category }"
      >
        {{ category }}
      </button>
    </div>

    <!-- Subcategory Buttons -->
    <div
      v-if="selectedCategory === 'Sports' && categories['Sports'].length"
      class="subcategory-buttons"
    >
      <button
        v-for="subcategory in categories['Sports']"
        :key="subcategory"
        @click="selectSubcategory(subcategory)"
        :class="{ active: selectedSubcategory === subcategory }"
      >
        {{ subcategory }}
      </button>
    </div>

    <!-- Events Grid -->
    <div class="events-grid">
      <div
        v-for="event in events"
        :key="event.id"
        class="event-card"
      >
        <div class="event-details">
          <h2 class="event-title">
            {{ event.short_title || event.name }}
          </h2>
          <p class="event-meta">
            📅 {{ formatDate(event.datetime_local || event.visible_at) }}
          </p>
          <p class="event-meta">
            📍 {{ event.venue?.name || 'Venue TBD' }}
          </p>
          <p class="event-meta">
            🎭 {{ event.type || 'Event' }}
          </p>
          <a
            :href="event.url || '#'"
            target="_blank"
            rel="noopener noreferrer"
            class="event-button"
          >
            View Tickets
          </a>

          <!-- RSVP Buttons -->
          <div class="rsvp-buttons" v-if="user">
            <button @click="rsvpToEvent(event.id, 'interested')">Interested</button>
            <button @click="rsvpToEvent(event.id, 'going')">Going</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-controls">
      <button
        :disabled="currentPage === 1"
        @click="prevPage"
        class="pagination-button"
      >
        Previous
      </button>
      <span class="page-indicator">Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        :disabled="currentPage === totalPages"
        @click="nextPage"
        class="pagination-button"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Events",
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user')),
      events: [],
      selectedCategory: 'All',
      selectedSubcategory: '',
      categories: {
        All: [],
        Broadway: [],
        Concerts: [],
        Sports: ['Golf', 'Soccer', 'Basketball', 'Baseball']
      },
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 50,
      loading: false
    };
  },
  methods: {
    async fetchEvents() {
      this.loading = true;
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

      let q = '';
      if (this.selectedCategory !== 'All') {
        q = this.selectedCategory;
      }

      if (this.selectedCategory === 'Sports' && this.selectedSubcategory) {
        q = this.selectedSubcategory;
      }

      const url = `${base}/events?page=${this.currentPage}&per_page=${this.itemsPerPage}&q=${encodeURIComponent(q)}`;
      console.log(`🔍 Fetching from: ${url}`);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        console.log("✅ Event API response:", data);

        // Some APIs return an object with { events: [...] }, others just return the array directly
        this.events = Array.isArray(data) ? data : (data.events || []);
        console.log("🎟️ Loaded events:", this.events);

        const totalCount = data.meta?.total || this.events.length;
        this.totalPages = Math.max(1, Math.ceil(totalCount / this.itemsPerPage));
        console.log(`📄 Total pages: ${this.totalPages}`);
      } catch (err) {
        console.error('❌ Error loading events:', err);
        this.events = [];
        this.totalPages = 1;
      } finally {
        this.loading = false;
      }
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedSubcategory = '';
      this.currentPage = 1;
      this.fetchEvents();
    },
    selectSubcategory(subcategory) {
      this.selectedSubcategory = subcategory;
      this.currentPage = 1;
      this.fetchEvents();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchEvents();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchEvents();
      }
    },
    formatDate(date) {
      if (!date) return "Date not available";
      const d = new Date(date);
      return d.toDateString();
    },
    async rsvpToEvent(eventId, status) {
      if (!this.user) return alert("You must be logged in to RSVP.");

      try {
        const res = await fetch("http://localhost:3000/api/rsvp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: this.user._id,
            eventId,
            status
          })
        });

        if (!res.ok) throw new Error("Failed to RSVP");

        alert(`✅ RSVP saved as "${status}"`);
      } catch (err) {
        console.error("❌ Failed to RSVP:", err);
        alert("RSVP failed. Try again.");
      }
    }
  },
  mounted() {
    this.fetchEvents();
  }
};
</script>

<style scoped>
.events-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #f0f0f0;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #ffcc00;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.filter-buttons,
.subcategory-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-buttons button,
.subcategory-buttons button {
  background-color: #2b2b3e;
  border: 1px solid #444;
  color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

.filter-buttons button.active,
.subcategory-buttons button.active,
.filter-buttons button:hover,
.subcategory-buttons button:hover {
  background-color: #ffcc00;
  color: #1e1e2f;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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

.rsvp-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.8rem;
}

.rsvp-buttons button {
  background-color: #444;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.rsvp-buttons button:hover {
  background-color: #ffcc00;
  color: #1e1e2f;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.pagination-button {
  background-color: #2b2b3e;
  border: 1px solid #444;
  color: #f0f0f0;
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, color 0.3s;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-button:hover:enabled {
  background-color: #ffcc00;
  color: #1e1e2f;
}

.page-indicator {
  font-size: 1rem;
  color: #cccccc;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 5px solid rgba(255, 204, 0, 0.3);
  border-top: 5px solid #ffcc00;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

</style>