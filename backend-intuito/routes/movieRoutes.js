const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/', movieController.createMovie);

router.get('/', movieController.getAllMovies);

router.get('/:id', movieController.getMovieById);

router.put('/:id', movieController.updateMovieById);

router.delete('/:id', movieController.deleteMovieById);

module.exports = router;