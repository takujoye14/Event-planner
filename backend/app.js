const express = require('express');
const cors = require('cors');

// DB and services
const connectMongo = require('./config/mongo');
const { redisClient, connectRedis } = require('./config/redis');
const { neo4jDriver, connectNeo4j } = require('./config/neo4j');
const { scheduleReminders } = require('./jobs/reminderScheduler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/rsvp', require('./routes/rsvp.routes'));
app.use('/api/users', require('./routes/follow.routes'));
app.use('/api/notifications', require('./routes/notification.routes'));

scheduleReminders();

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Smart Event Planner API is running');
});

// Startup function
const startServer = async () => {
  try {
    await connectMongo();
    await connectRedis();
    await connectNeo4j();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Startup failed:', err.message);
    process.exit(1);
  }
};

module.exports = startServer;
