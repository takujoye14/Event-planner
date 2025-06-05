const https = require('https');

exports.getEvents = (req, res) => {
  const { q = '', lat, lon } = req.query;  

  const clientId = 'NTA1NjM2NTV8MTc0OTEzMDA2NC4xMDM2MjQ4';
  const clientSecret = 'e133791522105ec14bdab49e084d035ef0b218b086ee0b7eb1beab430dae90a1';

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
        console.log("SeatGeek API Response:", jsonData);
        res.json(jsonData.events || []);
      } catch (err) {
        console.error("Error parsing SeatGeek response:", err);
        res.status(500).json({ error: 'Failed to parse SeatGeek response' });
      }
    });
  });

  apiReq.on('error', (err) => {
    console.error("Error fetching SeatGeek events:", err);
    res.status(500).json({ error: 'Failed to fetch SeatGeek events' });
  });

  apiReq.end();
};



exports.createEvent = async (req, res) => {
  try {
    const { short_title, description, datetime_local}= req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Title, description, and date are required.' });
    }

    const newEvent = { short_title, description, datetime_local };
    // Placeholder response — adjust this if you're saving to a database
    res.status(201).json({ event: newEvent });
  } catch (err) {
    console.error("❌ Create event error:", err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
