const { Movie } = require('../models');





exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).send(error.message);
    }
};



exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (!movie) {
            return res.status(404).send('La película no fue encontrada.');
        }
        res.json(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateMovieById = async (req, res) => {
    try {
        const [updated] = await Movie.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedMovie = await Movie.findByPk(req.params.id);
            res.status(200).json(updatedMovie);
        } else {
            res.status(404).send('La película no fue encontrada.');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.deleteMovieById = async (req, res) => {
    try {
        const deleted = await Movie.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send('La película fue eliminada.');
        } else {
            res.status(404).send('La película no fue encontrada.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};