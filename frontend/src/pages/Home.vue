<template>
    <div class="home-page">
      <section class="hero">
        <div class="hero-content">
          <h1>Welcome to MyEventApp</h1>
          <p>Discover and book tickets for the best events near you.</p>
          <router-link to="/events" class="cta-button">Explore Events</router-link>
        </div>
      </section>
    </div>
</template>
  
<script>
    export default {
    name: "Home"
    };
</script>
  
<style scoped>
    .home-page {
    color: #f0f0f0;
    }

    .hero {
    background: linear-gradient(145deg, #1a1a1a, #2b2b3e);
    padding: 4rem 2rem;
    text-align: center;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.6);
    }

    .hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ffcc00;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    }

    .hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #cccccc;
    }

    .cta-button {
    display: inline-block;
    background-color: #ffcc00;
    color: #1e1e2f;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.3s;
    }

    .cta-button:hover {
    background-color: #e1b40d;
    }
</style>