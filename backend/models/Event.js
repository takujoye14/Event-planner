const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  short_title: { type: String, required: true },
  description: { type: String, required: true },
  datetime_local: { type: Date, required: true },
  venue: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);
