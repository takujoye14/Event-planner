require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongo');
const redisClient = require('./config/redis');
const neo4jDriver = require('./config/neo4j');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/events', require('./routes/event.routes'));
app.use('/api/rsvp', require('./routes/rsvp.routes'));
app.use('/api/recommend', require('./routes/recommend.routes'));

const PORT = process.env.PORT || 3000;

connectMongo().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
