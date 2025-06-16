const mongoose = require('mongoose');

const RSVPSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['going', 'interested'], required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('RSVP', RSVPSchema);
