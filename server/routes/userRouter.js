import express from "express";

const router = express.Router();

router.post("/createUser", (req, res) => {
	console.log("CREATEUSER: ", req);
});

export default router;
