const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");

const getTournaments = asyncHandler( async (req, res) => {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
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
    const tournaments = await Tournament.findById(req.params.id);
    if(!tournaments){
        res.status(404);
        throw new Error('No se encontró el torneo');
    }

    if (tournament.user.toString() !== req.user._id.toString()) {
        res.status(403);
        throw new Error('No tienes permiso para realizar esta acción');
    }

    const tournamentsUpdated = await Tournament.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(tournamentsUpdated);
});

const deleteTournament = asyncHandler( async (req, res) => {
    const tournamentsDeleted = await Tournament.findById(req.params.id);
    if(!tournamentsDeleted){
        res.status(404);
        throw new Error('No se encontró el torneo');
    }
    await Tournament.deleteOne(tournamentsDeleted);
    res.status(200).json({message: `Se eliminó el torneo: ${req.params.id}`});
});
module.exports = {
    getTournaments, 
    createTournament, 
    updateTournament, 
    deleteTournament
}