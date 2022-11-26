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
		res.status(201).json({ message: "board created" });
	} else {
		res.status(403).json({ error: "User not authorized" });
	}
};

module.exports.createList = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		user.boards.id(req.body.boardId).lists.push({ name: req.body.listName });
		const updated = await user.save();

		res.status(201).json({ message: "List successfully created" });
	} else {
		res.status(403).json({ error: "User not authorized" });
	}
};

module.exports.createCard = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		user.boards
			.id(req.body.boardId)
			.lists.id(req.body.listId)
			.cards.push({ content: req.body.content });
		const updated = await user.save();

		res.status(201).json({ message: "Card succesfully added" });
	} else {
		res.status(403).json({ error: "User not authorized" });
	}
};

module.exports.removeCard = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		user.boards
			.id(req.body.boardId)
			.lists.id(req.body.listId)
			.cards.id(req.body.cardId)
			.remove();
		const updated = await user.save();

		res.status(204).json({ message: "Card removed successfully" });
	} else {
		res.status(403).josn({ error: "User not authorized" });
	}
};

module.exports.removeList = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		user.boards
			.id(req.body.boardId)
			.lists.id(req.body.listId).remove()
		const updated = await user.save();

		res.status(204).json({ message: "List removed successfully" });
	} else {
		res.status(403).json({ error: "User not authorized" });
	}
};
