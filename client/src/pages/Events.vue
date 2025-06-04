<template>
  <div class="events-page">
    <h1 class="page-title">Upcoming Events</h1>
    <div class="events-grid">
      <div
        v-for="event in dummyEvents"
        :key="event.id"
        class="event-card"
      >
        <img :src="event.image" alt="Event image" class="event-image" />
        <div class="event-details">
          <h2 class="event-title">{{ event.title }}</h2>
          <p class="event-description">{{ event.description }}</p>
          <p class="event-date">
            📅 {{ event.date }}
          </p>
          <button class="event-button">View Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Events",
  data() {
    return {
      dummyEvents: [
        {
          id: 1,
          title: "React Conference 2025",
          description: "Join us for an exciting day of React and JavaScript talks.",
          image: "https://via.placeholder.com/400x200",
          date: "2025-07-15"
        },
        {
          id: 2,
          title: "Vue.js Summit",
          description: "Explore the latest features in Vue 3 and best practices.",
          image: "https://via.placeholder.com/400x200",
          date: "2025-08-10"
        },
        {
          id: 3,
          title: "NoSQL Database Workshop",
          description: "Hands-on session on MongoDB, Redis, and Neo4j.",
          image: "https://via.placeholder.com/400x200",
          date: "2025-09-20"
        }
      ]
    };
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
  margin-bottom: 2rem;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.event-card {
  background: #1e1e2f;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  transition: transform 0.2s;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-details {
  padding: 1rem;
}

.event-title {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.event-description {
  font-size: 1rem;
  color: #cfcfcf;
  margin-bottom: 0.5rem;
}

.event-date {
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-bottom: 1rem;
}

.event-button {
  background-color: #f1c40f;
  color: #1e1e2f;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.event-button:hover {
  background-color: #e1b40d;
}
</style>
