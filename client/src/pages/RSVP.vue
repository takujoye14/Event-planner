<template>
  <div>
    <h2>🎟️ My RSVPs</h2>
    <ul>
      <li v-for="rsvp in rsvps" :key="rsvp._id">
        RSVP to Event ID: {{ rsvp.event_id }} – Status: {{ rsvp.status }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RSVP',
  data() {
    return {
      rsvps: []
    }
  },
  async mounted() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/rsvp/user/USER_ID`)
    const data = await res.json()
    this.rsvps = data
  }
}
</script>
