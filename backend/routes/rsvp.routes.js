const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvp.controller');

router.post('/', rsvpController.rsvpToEvent);
router.get('/user', rsvpController.getUserRSVPs);

module.exports = router;
