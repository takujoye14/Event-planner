<template>
  <div>
    <h2>➕ Create New Event</h2>
    <form @submit.prevent="createEvent">
      <input v-model="event.title" placeholder="Title" />
      <input v-model="event.date" type="datetime-local" />
      <input v-model="event.location" placeholder="Location" />
      <textarea v-model="event.description" placeholder="Description"></textarea>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        title: '',
        date: '',
        location: '',
        description: ''
      }
    }
  },
  methods: {
    async createEvent() {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.event)
      })
      const result = await res.json()
      alert('Event created: ' + result.title)
    }
  }
}
</script>
