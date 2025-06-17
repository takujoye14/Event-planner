<template>
    <div class="about-page">
      <h1>About MyEventApp</h1>
      <p>
        MyEventApp is your go-to platform for discovering, exploring, and booking tickets to a variety of events—whether it's Broadway shows, concerts, sports, or festivals.
      </p>
      <p>
        We aim to bring you the best events with seamless ticket booking and a clean, modern experience. Stay tuned as we expand and enhance our offerings!
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "About"
  };
  </script>
  
  <style scoped>
  .about-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    color: #f0f0f0;
    background: linear-gradient(145deg, #1a1a1a, #2b2b3e);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.6);
  }
  
  .about-page h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #ffcc00;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
    text-align: center;
  }
  
  .about-page p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #cccccc;
    margin-bottom: 1rem;
  }
  </style>