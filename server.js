require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Load DB connections
const connectMongo = require('./src/config/mongo');
const redisClient = require('./src/config/redis');
const neo4jDriver = require('./src/config/neo4j');

// Init Express
const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('✅ Smart Event Planner backend is running!');
});


app.use('/api/test', require('./src/routes/test.routes'));


// Import routes
app.use('/api/users', require('./src/routes/user.routes'));
app.use('/api/events', require('./src/routes/event.routes'));
// app.use('/api/rsvp', require('./src/routes/rsvp.routes'));
// app.use('/api/recommend', require('./src/routes/recommend.routes'));

// Serve frontend
// const fs = require('fs');

// const frontendPath = path.resolve(__dirname, 'client', 'dist');
// if (fs.existsSync(frontendPath)) {
//   app.use(express.static(frontendPath));

//   app.get('/*', (req, res) => {
//     res.sendFile(path.join(frontendPath, 'index.html'));
//   });
// } else {
//   console.warn('⚠️ client/dist not found — frontend not served.');
// }



// Start server
const PORT = process.env.PORT || 3000;
connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
  });
});
