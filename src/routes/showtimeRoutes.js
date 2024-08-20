const express = require('express');
const { createShowtime, getShowtimes, updateShowtime, deleteShowtime } = require('../controllers/showtimeController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, authorize('admin'), createShowtime);
router.get('/', getShowtimes);
router.put('/:id', protect, authorize('admin'), updateShowtime);
router.delete('/:id', protect, authorize('admin'), deleteShowtime);

module.exports = router;