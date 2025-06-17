<template>
  <div class="rsvp-page">
    <h1 class="page-title">RSVP to Events</h1>
    <div class="rsvp-list">
      <div
        v-for="rsvp in rsvpEvents"
        :key="rsvp.id"
        class="rsvp-card"
      >
        <h2>{{ rsvp.title }}</h2>
        <p>Date: {{ rsvp.date }}</p>
        <button>RSVP Now</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RSVP",
  data() {
    return {
      rsvpEvents: [
        { id: 1, title: "Tech Meetup", date: "2025-07-15" },
        { id: 2, title: "Networking Night", date: "2025-08-20" },
        { id: 3, title: "Startup Pitch", date: "2025-09-10" }
      ]
    };
  }
};
</script>

<style scoped>
.rsvp-page {
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

.rsvp-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.rsvp-card {
  background: #1e1e2f;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.rsvp-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.rsvp-card p {
  font-size: 1rem;
  color: #cfcfcf;
  margin-bottom: 1rem;
}

.rsvp-card button {
  background-color: #f1c40f;
  color: #1e1e2f;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.rsvp-card button:hover {
  background-color: #e1b40d;
}
</style>