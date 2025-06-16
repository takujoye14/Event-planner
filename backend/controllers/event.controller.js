const https = require('https');
const Event = require('../models/Event'); // Ensure this path matches your file structure

// GET /api/events?q=&lat=&lon=
exports.getEvents = (req, res) => {
  const { q = '', lat, lon } = req.query;

  const clientId = process.env.SEATGEEK_CLIENT_ID;
  const clientSecret = process.env.SEATGEEK_CLIENT_SECRET;

  let queryParams = `client_id=${clientId}&client_secret=${clientSecret}&per_page=50`;

  if (q) queryParams += `&q=${encodeURIComponent(q)}`;
  if (lat && lon) queryParams += `&lat=${lat}&lon=${lon}`;

  const options = {
    hostname: 'api.seatgeek.com',
    port: 443,
    path: `/2/events?${queryParams}`,
    method: 'GET'
  };

  const apiReq = https.request(options, (apiRes) => {
    let data = '';
    apiRes.on('data', (chunk) => {
      data += chunk;
    });
    apiRes.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        const events = jsonData.events || [];
        res.json(events);
      } catch (err) {
        console.error("❌ Error parsing SeatGeek response:", err.message);
        res.status(500).json({ error: 'Failed to parse SeatGeek response' });
      }
    });
  });

  apiReq.on('error', (err) => {
    console.error("❌ Error fetching SeatGeek events:", err.message);
    res.status(500).json({ error: 'Failed to fetch SeatGeek events' });
  });

  apiReq.end();
};

// POST /api/events
exports.createEvent = async (req, res) => {
  try {
    const { short_title, description, datetime_local, venue } = req.body;

    if (!short_title || !description || !datetime_local || !venue) {
      return res.status(400).json({ error: 'All fields are required: short_title, description, datetime_local, venue.' });
    }

    const newEvent = await Event.create({ short_title, description, datetime_local, venue });

    res.status(201).json({ event: newEvent });
  } catch (err) {
    console.error("❌ Create event error:", err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
