const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");

const {getAthletes} = require('../controllers/athleteController');
const {registerAthlete} = require('../controllers/athleteController');
const {updateAthlete} = require('../controllers/athleteController');
const {deleteAthlete} = require('../controllers/athleteController');

router.get('/', getAthletes);
router.post('/', registerAthlete);
router.put('/:id', updateAthlete);
router.delete('/:id', deleteAthlete);

module.exports = router;