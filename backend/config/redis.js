const redis = require('redis');

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

client.on('error', (err) => console.error('❌ Redis error:', err.message));

const connectRedis = async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
      console.log('✅ Redis connected');
    }
  } catch (err) {
    console.error('❌ Redis connection failed:', err.message);
    throw err; // Let app.js handle shutdown
  }
};

module.exports = {
  redisClient: client,
  connectRedis
};