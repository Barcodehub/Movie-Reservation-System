const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  totalSeats: { type: Number, required: true, min: 1 },
  availableSeats: { type: Number, required: true, min: 0 },
});

// Validación para asegurar que availableSeats no sea mayor que totalSeats
showtimeSchema.pre('save', function(next) {
  if (this.availableSeats > this.totalSeats) {
    this.availableSeats = this.totalSeats;
  }
  next();
});

// Método para actualizar availableSeats
showtimeSchema.methods.updateAvailableSeats = function(seatsToReserve) {
  this.availableSeats = Math.max(0, Math.min(this.availableSeats - seatsToReserve, this.totalSeats));
  return this.save();
};

module.exports = mongoose.model('Showtime', showtimeSchema);