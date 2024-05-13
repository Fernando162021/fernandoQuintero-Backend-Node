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
            return res.status(404).json({ message: "No se encontró el torneo" });
        }
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "No se proporcionó un usuario válido" });
        }

        if (!tournament.user || req.user._id.toString() !== tournament.user.toString()) {
            return res.status(403).json({ message: "No tiene permiso para registrar un atleta en este torneo" });
        }        
        
        const athlete = await Athlete.create({
            creator: req.user._id,
            tournament: tournament._id,
            athleteName,
            country,
            city,
            bornDate,
            gender,
            weightDivision
        });
        
        res.status(201).json({
            message: "Atleta registrado exitosamente",
            athlete
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar el atleta",
            error: error.message
        });
    }
});


const updateAthlete = asyncHandler(async (req, res) => {
    try {
        const athlete = await Athlete.findById(req.params.id);
        if (!athlete) {
            return res.status(404).json({ message: "No se encontró el atleta" });
        }
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "No se proporcionó un usuario válido" });
        }

        if (!athlete.creator || req.user._id.toString() !== athlete.creator.toString()) {
            return res.status(403).json({ message: "No tiene permiso para actualizar este atleta" });
        }

        const updatedAthlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        res.status(200).json(updatedAthlete);
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el atleta",
            error: error.message
        });
    }
});

const deleteAthlete = asyncHandler(async (req, res) => {
    try {
        const athlete = await Athlete.findById(req.params.id);
        if (!athlete) {
            return res.status(404).json({ message: "No se encontró el atleta" });
        }
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "No se proporcionó un usuario válido" });
        }

        if (!athlete.creator || req.user._id.toString() !== athlete.creator.toString()) {
            return res.status(403).json({ message: "No tiene permiso para eliminar este atleta" });
        }
        
        await Athlete.findByIdAndDelete(req.params.id);
        
        res.status(200).json({ message: "Se eliminó el atleta exitosamente" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el atleta",
            error: error.message
        });
    }
});

module.exports = {
    getAthletes, 
    registerAthlete, 
    updateAthlete, 
    deleteAthlete
}