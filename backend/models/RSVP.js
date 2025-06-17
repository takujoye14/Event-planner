const mongoose = require('mongoose');

const RSVPSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, 
  event_id: { type: String, required: true },
  status: { type: String, enum: ['going', 'interested'], required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('RSVP', RSVPSchema);
