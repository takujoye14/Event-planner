<template>
  <div class="recommendations-page">
    <h1 class="page-title">Recommended Events</h1>
    <div class="recommendations-list">
      <div
        v-for="recommendation in recommendations"
        :key="recommendation.id"
        class="recommendation-card"
      >
        <h2>{{ recommendation.title }}</h2>
        <p>{{ recommendation.description }}</p>
        <button>Learn More</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommendations",
  data() {
    return {
      recommendations: [
        { id: 1, title: "AI Conference 2025", description: "Discover the latest in AI." },
        { id: 2, title: "Data Science Bootcamp", description: "Hands-on learning." },
        { id: 3, title: "Blockchain Summit", description: "Explore Web3." }
      ]
    };
  }
};
</script>

<style scoped>
.recommendations-page {
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

.recommendations-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.recommendation-card {
  background: #1e1e2f;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.recommendation-card h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.recommendation-card p {
  font-size: 1rem;
  color: #cfcfcf;
  margin-bottom: 1rem;
}

.recommendation-card button {
  background-color: #f1c40f;
  color: #1e1e2f;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.recommendation-card button:hover {
  background-color: #e1b40d;
}
</style>