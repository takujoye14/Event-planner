<template>
  <div>
    <h2>🤝 Event Recommendations</h2>
    <ul>
      <li v-for="event in recommended" :key="event._id">
        {{ event.title }} - {{ event.date }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recommended: []
    }
  },
  async mounted() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/recommend/USER_ID`)
    const data = await res.json()
    this.recommended = data
  }
}
</script>
