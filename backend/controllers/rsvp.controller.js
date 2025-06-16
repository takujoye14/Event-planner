const { neo4jDriver } = require('../config/neo4j');
const mongoose = require('mongoose');
const RSVP = require('../models/RSVP'); // optional fallback

exports.rsvpToEvent = async (req, res) => {
  const { userId, eventId, status } = req.body;

  if (!userId || !eventId || !status || !['going', 'interested'].includes(status)) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const session = neo4jDriver.session();

  try {
    const result = await session.run(
      `
      MERGE (u:User {id: $userId})
      MERGE (e:Event {id: $eventId})
      MERGE (u)-[r:RSVPED]->(e)
      SET r.status = $status
      RETURN r
      `,
      { userId, eventId, status }
    );

    // Optionally store in MongoDB for auditing
    await RSVP.findOneAndUpdate(
      { user_id: userId, event_id: eventId },
      { status },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'RSVP saved successfully' });
  } catch (err) {
    console.error('❌ Neo4j RSVP error:', err);
    res.status(500).json({ error: 'Failed to save RSVP' });
  } finally {
    await session.close();
  }
};

exports.getUserRSVPs = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const session = neo4jDriver.session();

  try {
    const result = await session.run(
      `
      MATCH (u:User {id: $userId})-[r:RSVPED]->(e:Event)
      RETURN e.id AS eventId, r.status AS status
      `,
      { userId }
    );

    const rsvps = result.records.map(record => ({
      eventId: record.get('eventId'),
      status: record.get('status')
    }));

    res.json({ rsvps });
  } catch (err) {
    console.error('❌ Neo4j fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch RSVPs' });
  } finally {
    await session.close();
  }
};
