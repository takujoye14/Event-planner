const express = require('express');
const router = express.Router();
const { getNotifications } = require('../utils/notifications');

router.get('/:userId', async (req, res) => {
  try {
    const notifications = await getNotifications(req.params.userId);
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
