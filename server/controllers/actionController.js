const User = require("../models/User");

module.exports.getBoards = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		const board = user.boards.id(req.body.id);
		if (board) {
			res.status(200).json({ board });
		} else {
			res.status(404).json({ error: "board not found" });
		}
	} else {
		res.status(403).json({ error: "User not authenticated" });
	}
};

module.exports.createBoard = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		user.boards.push({ name: req.body.name });
		const updatedBoards = await user.save();
		res.status(200).json({ message: "board created" });
	} else {
		res.status(403).json({ error: "User not authorized" });
	}
};

module.exports.createList = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		user.boards.id(req.body.boardId).lists.push({ name: req.body.listName });
		const { boards } = await user.save();

		res
			.status(200)
			.json({ message: "List successfully created", data: boards });
	} else {
		res.status(403).json({ error: "User not authorized" });
	}
};
