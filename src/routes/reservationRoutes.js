const express = require('express');
const { createReservation, getUserReservations, cancelReservation, getAllReservations } = require('../controllers/reservationController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, createReservation);
router.get('/user', protect, getUserReservations);
router.delete('/:id', protect, cancelReservation);
router.get('/all', protect, authorize('admin'), getAllReservations);

module.exports = router;