const Showtime = require('../models/Showtime');

exports.createShowtime = async (req, res) => {
  try {
    const { movie, startTime, endTime, totalSeats, availableSeats } = req.body;
    
    // Asegurarse de que availableSeats no sea mayor que totalSeats
    const actualAvailableSeats = Math.min(availableSeats, totalSeats);
    
    const showtime = await Showtime.create({
      movie,
      startTime,
      endTime,
      totalSeats,
      availableSeats: actualAvailableSeats
    });
    
    res.status(201).json(showtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateShowtime = async (req, res) => {
  try {
    const { totalSeats, availableSeats } = req.body;
    
    // Si se está actualizando totalSeats o availableSeats, asegurarse de que sean válidos
    if (totalSeats !== undefined && availableSeats !== undefined) {
      req.body.availableSeats = Math.min(availableSeats, totalSeats);
    } else if (totalSeats !== undefined) {
      const showtime = await Showtime.findById(req.params.id);
      req.body.availableSeats = Math.min(showtime.availableSeats, totalSeats);
    }
    
    const updatedShowtime = await Showtime.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    if (!updatedShowtime) return res.status(404).json({ message: 'Función no encontrada' });
    res.json(updatedShowtime);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.find().populate('movie');
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByIdAndDelete(req.params.id);
    if (!showtime) return res.status(404).json({ message: 'Función no encontrada' });
    res.json({ message: 'Función eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};