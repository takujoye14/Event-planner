<template>
  <div class="events-page">
    <h1 class="page-title">Discover Events</h1>

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
      console.log('🔍 Fetching events...');
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

      let q = '';
      if (this.selectedCategory !== 'All') {
        q = this.selectedCategory;
      }

      // Add subcategory only if sports is selected
      if (this.selectedCategory === 'Sports' && this.selectedSubcategory) {
        q = this.selectedSubcategory;
      }

      const url = `${base}/events?page=${this.currentPage}&per_page=${this.itemsPerPage}&q=${encodeURIComponent(q)}`;
      console.log(`🛰️ API URL: ${url}`);

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        console.log('✅ API Response:', data);

        this.events = data.events || [];
        this.totalPages = Math.max(1, Math.ceil((data.meta?.total || this.events.length) / this.itemsPerPage));
        console.log(`📄 Total Pages: ${this.totalPages}`);
      } catch (err) {
        console.error('❌ Error loading events:', err);
        this.events = [];
        this.totalPages = 1;
      } finally {
        this.loading = false;
      }
    },
    selectCategory(category) {
      console.log(`📌 Selected Category: ${category}`);
      this.selectedCategory = category;
      this.selectedSubcategory = '';
      this.currentPage = 1;
      this.fetchEvents();
    },
    selectSubcategory(subcategory) {
      console.log(`📌 Selected Subcategory: ${subcategory}`);
      this.selectedSubcategory = subcategory;
      this.currentPage = 1;
      this.fetchEvents();
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        console.log(`➡️ Next Page: ${this.currentPage}`);
        this.fetchEvents();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        console.log(`⬅️ Previous Page: ${this.currentPage}`);
        this.fetchEvents();
      }
    },
    formatDate(date) {
      if (!date) return "Date not available";
      const d = new Date(date);
      return d.toDateString();
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

/* Filter Buttons */
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

/* Event Grid */
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

/* Pagination Controls */
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
</style>