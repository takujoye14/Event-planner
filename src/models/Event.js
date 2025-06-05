const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  short_title: String,
  description: String,
  datetime_local: Date,
  venue: String,
});
module.exports = mongoose.model('Event', EventSchema);
