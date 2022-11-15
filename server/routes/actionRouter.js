const express = require('express');
const router = express.Router();

const actionController = require('../controllers/actionController');

router.post("/createBoard", actionController.createBoard);

module.exports = router;