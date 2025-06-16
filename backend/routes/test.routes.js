const express = require('express');
const router = express.Router();
const redisClient = require('../config/redis');
const mongoose = require('mongoose');
const neo4jDriver = require('../config/neo4j');

// Redis Test Route
router.get('/redis', async (req, res) => {
  try {
    const testValue = 'Hello from Redis!';
    await redisClient.set('test_key', testValue, { EX: 10 });
    const value = await redisClient.get('test_key');
    res.json({ message: value });
  } catch (err) {
    console.error("❌ Redis test error:", err);
    res.status(500).json({ error: 'Redis failed', details: err.message });
  }
});

// MongoDB Test Route
const TestSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema);

router.get('/mongo', async (req, res) => {
  try {
    const doc = await TestModel.create({ name: 'Test User' });
    res.json({ saved: doc });
  } catch (err) {
    console.error("❌ MongoDB test error:", err);
    res.status(500).json({ error: 'MongoDB failed', details: err.message });
  }
});

// Neo4j Test Route
router.get('/neo4j', async (req, res) => {
  const session = neo4jDriver.session();
  try {
    const result = await session.run(`
      MERGE (n:TestNode {name: 'NeoUser'})
      RETURN n
    `);
    const node = result.records[0].get('n').properties;
    res.json({ node });
  } catch (err) {
    console.error("❌ Neo4j test error:", err);
    res.status(500).json({ error: 'Neo4j failed', details: err.message });
  } finally {
    await session.close();
  }
});

module.exports = router;