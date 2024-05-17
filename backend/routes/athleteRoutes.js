const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const {getAthletes} = require('../controllers/athleteController');
const {getAthleteById} = require('../controllers/athleteController');
const {getAthletesByTournamentId} = require('../controllers/athleteController');
const {registerAthlete} = require('../controllers/athleteController');
const {updateAthlete} = require('../controllers/athleteController');
const {deleteAthlete} = require('../controllers/athleteController');

router.get('/', getAthletes);
router.get('/:id', getAthleteById);
router.get('/tournament/:tournamentId', getAthletesByTournamentId);
router.post('/', protect, registerAthlete);
router.put('/:id', protect, updateAthlete);
router.delete('/:id', protect, deleteAthlete);

module.exports = router;