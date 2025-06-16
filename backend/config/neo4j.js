const neo4j = require('neo4j-driver');

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const connectNeo4j = async () => {
  try {
    await driver.verifyConnectivity();
    console.log('✅ Neo4j connected');
  } catch (err) {
    console.error('❌ Neo4j connection failed:', err.message);
    throw err; // Let app.js handle shutdown
  }
};

module.exports = {
  neo4jDriver: driver,
  connectNeo4j
};