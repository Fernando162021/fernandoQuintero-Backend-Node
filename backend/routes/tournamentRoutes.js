const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const {getTournaments} = require('../controllers/tournamentController');
const {createTournament} = require('../controllers/tournamentController');
const {updateTournament} = require('../controllers/tournamentController');
const {deleteTournament} = require('../controllers/tournamentController');

router.get('/', getTournaments);
router.post('/', createTournament);
router.put('/:id', updateTournament);
router.delete('/:id', deleteTournament);

module.exports = router;