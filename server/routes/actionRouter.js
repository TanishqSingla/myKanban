const express = require("express");
const router = express.Router();

const actionController = require("../controllers/actionController");

router.post("/getBoards", actionController.getBoards);
router.post("/createBoard", actionController.createBoard);
router.post("/createList", actionController.createList);
router.post('/createCard', actionController.createCard);
router.delete('/removeCard', actionController.removeCard);
router.delete('/removeList', actionController.removeList);

module.exports = router;
