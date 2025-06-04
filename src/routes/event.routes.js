const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');

// POST /api/events
router.post('/', eventController.createEvent);

// GET /api/events
router.get('/', eventController.getEvents);

module.exports = router;
