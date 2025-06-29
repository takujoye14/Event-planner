// backend/jobs/reminderScheduler.js
const cron = require('node-cron');
const Event = require('../models/Event');
const RSVP = require('../models/RSVP');
const { sendNotification } = require('../utils/notifications');
const mongoose = require('mongoose');

const scheduleReminders = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('🕛 Running daily event reminder job...');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    try {
      // 1. Find events happening tomorrow
      const events = await Event.find({
        datetime_local: {
          $gte: tomorrow,
          $lt: dayAfter
        }
      });

      if (events.length === 0) return console.log('📭 No events tomorrow.');

      for (const event of events) {
        // 2. Find users who RSVPed
        const rsvps = await RSVP.find({ eventId: event._id });

        for (const rsvp of rsvps) {
          const msg = {
            title: '📅 Event Reminder',
            message: `You're attending "${event.short_title || event.name}" tomorrow!`,
            timestamp: new Date().toISOString()
          };

          await sendNotification(rsvp.userId.toString(), msg);
        }
      }

      console.log(`✅ Sent reminders for ${events.length} events.`);
    } catch (err) {
      console.error('❌ Error in reminder job:', err.message);
    }
  });
};

module.exports = { scheduleReminders };
