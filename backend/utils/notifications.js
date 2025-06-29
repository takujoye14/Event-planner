const { redisClient } = require('../config/redis');

const sendNotification = async (userId, notification) => {
  try {
    const key = `notifications:${userId}`;
    await redisClient.lPush(key, JSON.stringify(notification));
    await redisClient.lTrim(key, 0, 49); // keep only latest 50
  } catch (err) {
    console.error('❌ Failed to push notification to Redis:', err.message);
  }
};

const getNotifications = async (userId) => {
  try {
    const key = `notifications:${userId}`;
    const data = await redisClient.lRange(key, 0, -1);
    return data.map(item => JSON.parse(item));
  } catch (err) {
    console.error('❌ Failed to fetch notifications:', err.message);
    return [];
  }
};

module.exports = { sendNotification, getNotifications };
