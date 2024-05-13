const asyncHandler = require("express-async-handler");
const Athlete = require("../models/athleteModel");
const Tournament = require("../models/tournamentModel");

const getAthletes = asyncHandler( async (req, res) => {
    const athletes = await Athlete.find();
    res.status(200).json(athletes);
});

const registerAthlete = asyncHandler(async (req, res) => {
    try {
        const { athleteName, country, city, bornDate, gender, weightDivision, tournamentId } = req.body;
        
        const tournament = await Tournament.findById(tournamentId);
        
        if (!tournament) {
            res.status(404);
            throw new Error("No se encontró el torneo");
        }
        
        if (req.user._id.toString() !== tournament.user.toString()) {
            res.status(403);
            throw new Error("No tiene permiso para registrar un atleta en este torneo");
        }
        
        const athlete = await Athlete.create({
            athleteName,
            country,
            city,
            bornDate,
            gender,
            weightDivision,
            tournament: tournament._id
        });
        
        res.status(201).json({
            message: "Atleta registrado exitosamente",
            athlete: athlete
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar el atleta",
            error: error.message
        });
    }    
});

const updateAthlete = asyncHandler( async (req, res) => {
    const athletes = await Athlete.findById(req.params.id);
    if(!athletes){
        res.status(404);
        throw new Error('No se encontró el atleta');
    }
    const athleteUpdated = await Athlete.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(athleteUpdated);
});

const deleteAthlete = asyncHandler( async (req, res) => {
    const athleteDeleted = await Athlete.findById(req.params.id);
    if(!athleteDeleted){
        res.status(404);
        throw new Error('No se encontró el atleta');
    }
    await Athlete.deleteOne(athleteDeleted);
    res.status(200).json({message: `Se eliminó el atleta: ${req.params.id}`});
});

module.exports = {
    getAthletes, 
    registerAthlete, 
    updateAthlete, 
    deleteAthlete
}