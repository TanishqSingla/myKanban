const User = require("../models/User");

module.exports.createBoard = async (req, res) => {
	if (req.user) {
		const user = await User.findOne({ email: req.user.email });
		user.boards.push({ name: req.body.name });
		user.save();
		res.status(200).json({ message: "board created" });
	} else {
		res.status(403).json({ error: "User not authenticated" });
	}
};
