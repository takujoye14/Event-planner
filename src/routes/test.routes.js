const express = require('express');
const router = express.Router();
const redisClient = require('../config/redis');

router.get('/redis', async (req, res) => {
  try {
    await redisClient.set('test_key', 'Hello from Redis!', { EX: 10 });
    const value = await redisClient.get('test_key');
    res.json({ message: value });
  } catch (err) {
    res.status(500).json({ error: 'Redis failed', details: err.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({ name: String });
const TestModel = mongoose.model('Test', TestSchema);

router.get('/mongo', async (req, res) => {
  try {
    const doc = await TestModel.create({ name: 'Test User' });
    res.json({ saved: doc });
  } catch (err) {
    res.status(500).json({ error: 'MongoDB failed', details: err.message });
  }
});

const neo4jDriver = require('../config/neo4j');

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
    res.status(500).json({ error: 'Neo4j failed', details: err.message });
  } finally {
    await session.close();
  }
});
