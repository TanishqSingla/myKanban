const express = require("express");
const router = express.Router();

const actionController = require("../controllers/actionController");

router.post("/getBoards", actionController.getBoards);
router.post("/createBoard", actionController.createBoard);
router.post("/createList", actionController.createList);

module.exports = router;
