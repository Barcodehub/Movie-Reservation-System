const express = require('express');
const { createMovie, getMovies, updateMovie, deleteMovie } = require('../controllers/movieController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post('/', protect, authorize('admin'), createMovie);
router.get('/', getMovies);
router.put('/:id', protect, authorize('admin'), updateMovie);
router.delete('/:id', protect, authorize('admin'), deleteMovie);

module.exports = router;