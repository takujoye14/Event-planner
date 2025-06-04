const https = require('https');

exports.getEvents = (req, res) => {
  const options = {
    method: 'GET',
    hostname: 'real-time-events-search.p.rapidapi.com',
    path: '/search-events?query=Concerts%20in%20San-Francisco&date=any&is_virtual=false&start=0',
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'real-time-events-search.p.rapidapi.com'
    }
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        console.log("RapidAPI Response:", parsedData);

        if (parsedData && parsedData.data) {
          res.json(parsedData.data); // Send the data array
        } else {
          res.json([]);
        }
      } catch (error) {
        console.error("Error parsing API response:", error);
        res.status(500).json({ error: 'Failed to parse API response' });
      }
    });
  });

  request.on('error', (error) => {
    console.error("RapidAPI request error:", error);
    res.status(500).json({ error: 'Failed to fetch data from RapidAPI' });
  });

  request.end();
};




exports.createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ error: 'Title, description, and date are required.' });
    }

    const newEvent = { title, description, date };
    // Placeholder response — adjust this if you're saving to a database
    res.status(201).json({ event: newEvent });
  } catch (err) {
    console.error("❌ Create event error:", err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};
