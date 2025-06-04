<template>
  <div class="create-event-page">
    <h1 class="page-title">Create New Event</h1>
    <form @submit.prevent="handleSubmit" class="event-form">
      <div class="input-group">
        <input type="text" v-model="title" placeholder="Event Title" required />
      </div>
      <div class="input-group">
        <textarea v-model="description" placeholder="Event Description" required></textarea>
      </div>
      <div class="input-group">
        <input type="date" v-model="date" required />
      </div>
      <button type="submit">Create Event</button>
    </form>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "CreateEvent",
  data() {
    return {
      title: "",
      description: "",
      date: "",
      successMessage: ""
    };
  },
  methods: {
    async handleSubmit() {
      this.successMessage = "";
      try {
        const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
        const res = await fetch(`${base}/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: this.title,
            description: this.description,
            date: this.date
          })
        });
        if (!res.ok) throw new Error("Failed to create event");
        await res.json();
        this.successMessage = `Event "${this.title}" created successfully!`;
        this.title = "";
        this.description = "";
        this.date = "";
      } catch (err) {
        console.error("Error creating event:", err);
      }
    }
  }
};
</script>

<style scoped>
.create-event-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  color: #f0f0f0;
}

.page-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.event-form .input-group {
  margin-bottom: 1rem;
}

.event-form input,
.event-form textarea {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
}

.event-form button {
  background-color: #f1c40f;
  color: #1e1e2f;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.event-form button:hover {
  background-color: #e1b40d;
}

.success-message {
  text-align: center;
  margin-top: 1rem;
  color: #4caf50;
}
</style>
