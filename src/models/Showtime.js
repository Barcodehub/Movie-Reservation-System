const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
});

module.exports = mongoose.model('Showtime', showtimeSchema);