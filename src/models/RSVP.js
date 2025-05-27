const mongoose = require('mongoose');
const RSVPSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  event_id: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['going', 'interested'] }
});
module.exports = mongoose.model('RSVP', RSVPSchema);
