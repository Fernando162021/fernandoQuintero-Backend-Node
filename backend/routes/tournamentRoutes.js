const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const {getTournaments} = require('../controllers/tournamentController');
const {getTournamentById} = require('../controllers/tournamentController');
const {getTournamentsByUser} = require('../controllers/tournamentController')
const {createTournament} = require('../controllers/tournamentController');
const {updateTournament} = require('../controllers/tournamentController');
const {deleteTournament} = require('../controllers/tournamentController');

router.get('/', getTournaments);
router.get('/:id', getTournamentById);
router.get('/user/:id', protect, getTournamentsByUser);
router.post('/', protect, createTournament);
router.put('/:id', protect, updateTournament);
router.delete('/:id', protect, deleteTournament);

module.exports = router;