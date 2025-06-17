<template>
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; 2025 MyEventApp. All rights reserved.</p>
        <div class="socials">
          <a href="#" aria-label="Facebook">🌐</a>
          <a href="#" aria-label="Twitter">🐦</a>
          <a href="#" aria-label="Instagram">📸</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  };
  </script>
  
  <style scoped>
  .footer {
    background: linear-gradient(90deg, #1a1a1a, #333);
    color: #fff;
    text-align: center;
    padding: 1rem 2rem;
    border-top: 1px solid #444;
  }
  
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
  
  .socials a {
    margin: 0 0.5rem;
    font-size: 1.2rem;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .socials a:hover {
    color: #ff6600;
  }
  </style>