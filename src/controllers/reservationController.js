const Reservation = require('../models/Reservation');
const Showtime = require('../models/Showtime');

exports.createReservation = async (req, res) => {
  try {
    const { showtime: showtimeId, seats } = req.body;
    const showtime = await Showtime.findById(showtimeId);
    
    if (!showtime) {
      return res.status(404).json({ message: 'Función no encontrada' });
    }
    
    if (showtime.availableSeats < seats) {
      return res.status(400).json({ message: 'No hay suficientes asientos disponibles' });
    }
    
    const reservation = await Reservation.create({
      user: req.user._id,
      showtime: showtimeId,
      seats,
    });
    
    showtime.availableSeats -= seats;
    await showtime.save();
    
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id }).populate('showtime');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para cancelar esta reserva' });
    }
    
    const showtime = await Showtime.findById(reservation.showtime);
    showtime.availableSeats += reservation.seats;
    await showtime.save();
    
    await reservation.remove();
    
    res.json({ message: 'Reserva cancelada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user showtime');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};