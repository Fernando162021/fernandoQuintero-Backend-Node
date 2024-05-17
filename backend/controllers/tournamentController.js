const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");

const getTournaments = asyncHandler( async (req, res) => {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
});

const getTournamentById = asyncHandler(async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);
    if (tournament) {
        res.status(200).json(tournament);
    } else {
        res.status(404);
        throw new Error("Torneo no encontrado");
    }
});

const getTournamentsByUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const tournaments = await Tournament.find({ user: userId });
        res.json(tournaments);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener los torneos del usuario: ${error.message}` });
    }
});

const createTournament = asyncHandler( async (req, res) => {
    const tournament = await Tournament.create({
        tournamentName : req.body.tournamentName,
        country : req.body.country,
        city : req.body.city,
        startDate : req.body.startDate,
        registrationEnd : req.body.registrationEnd,
        user: req.user.id
    })
    res.status(201).json(tournament);
});

const updateTournament = asyncHandler( async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);
    if(!tournament){
        res.status(404);
        throw new Error('No se encontró el torneo');
    }

    const tournamentsUpdated = await Tournament.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(tournamentsUpdated);
});

const deleteTournament = asyncHandler( async (req, res) => {
    const tournament = await Tournament.findById(req.params.id);
    if(!tournament){
        res.status(404);
        throw new Error('No se encontró el torneo');
    }

    await Tournament.deleteOne(tournament);
    res.status(200).json({message: `Se eliminó el torneo: ${req.params.id}`});
});
module.exports = {
    getTournaments,
    getTournamentById, 
    getTournamentsByUser,
    createTournament, 
    updateTournament, 
    deleteTournament
}