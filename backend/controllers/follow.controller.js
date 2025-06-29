const { neo4jDriver } = require('../config/neo4j');
const User = require('../models/User'); // Make sure this is imported
const { sendNotification } = require('../utils/notifications');

exports.followUser = async (req, res) => {
  const { followerId, followeeId } = req.body;

  if (!followerId || !followeeId || followerId === followeeId) {
    return res.status(400).json({ error: 'Invalid follow data' });
  }

  const session = neo4jDriver.session();

  try {
    await session.run(
      `
      MERGE (a:User {id: $followerId})
      MERGE (b:User {id: $followeeId})
      MERGE (a)-[:FOLLOWS]->(b)
      `,
      { followerId, followeeId }
    );

    // Load follower info from MongoDB
    const follower = await User.findById(followerId).select('name email');
    if (!follower) {
      console.warn('⚠️ Follower not found in MongoDB');
    } else {
      const message = `${follower.name} started following you.`;
      await sendNotification(followeeId, {
        type: 'follow',
        message,
        from: followerId,
        timestamp: Date.now(),
      });
      console.log(`🔔 Notification sent to ${followeeId}: ${message}`);
    }

    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    console.error('❌ Follow error:', err.message);
    res.status(500).json({ error: 'Failed to follow user' });
  } finally {
    await session.close();
  }
};

// POST /api/users/unfollow
exports.unfollowUser = async (req, res) => {
  const { followerId, followeeId } = req.body;

  if (!followerId || !followeeId || followerId === followeeId) {
    return res.status(400).json({ error: 'Invalid unfollow data' });
  }

  const session = neo4jDriver.session();

  try {
    await session.run(
      `
      MATCH (a:User {id: $followerId})-[r:FOLLOWS]->(b:User {id: $followeeId})
      DELETE r
      `,
      { followerId, followeeId }
    );

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    console.error('❌ Unfollow error:', err.message);
    res.status(500).json({ error: 'Failed to unfollow user' });
  } finally {
    await session.close();
  }
};

// GET /api/users/following?userId=123
exports.getFollowing = async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const session = neo4jDriver.session();

  try {
    const result = await session.run(
      `
      MATCH (:User {id: $userId})-[:FOLLOWS]->(followee:User)
      RETURN followee.id AS userId
      `,
      { userId }
    );

    const following = result.records.map(r => r.get('userId'));
    res.json({ following });
  } catch (err) {
    console.error('❌ Fetch following error:', err.message);
    res.status(500).json({ error: 'Failed to fetch following list' });
  } finally {
    await session.close();
  }
};

// GET /api/users/followers?userId=123
exports.getFollowers = async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ error: 'userId is required' });

  const session = neo4jDriver.session();

  try {
    const result = await session.run(
      `
      MATCH (follower:User)-[:FOLLOWS]->(:User {id: $userId})
      RETURN follower.id AS userId
      `,
      { userId }
    );

    const followers = result.records.map(r => r.get('userId'));
    res.json({ followers });
  } catch (err) {
    console.error('❌ Fetch followers error:', err.message);
    res.status(500).json({ error: 'Failed to fetch followers' });
  } finally {
    await session.close();
  }
};

// GET /api/users/allUsers
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id name email'); // Limit fields if needed
    res.json({ users });
  } catch (err) {
    console.error('❌ Get all users error:', err.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
