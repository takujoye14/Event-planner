<template>
  <div>
    <h2>📅 Upcoming Events</h2>
    <ul>
      <li v-for="event in events" :key="event._id">
        <strong>{{ event.title }}</strong> - {{ event.date }} - {{ event.location }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Events',
  data() {
    return {
      events: []
    }
  },
  async mounted() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`)
    const data = await res.json()
    this.events = data
  }
}
</script>
