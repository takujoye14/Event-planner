const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Title, description, and date are required.' });
    }

    const newEvent = await Event.create({ title, description, date });
    res.status(201).json({ event: newEvent });
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("Get events error:", err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
