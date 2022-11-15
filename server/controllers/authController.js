const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createJWT(_id, email) {
	return jwt.sign({ _id, email }, "my secret");
}

module.exports.getUser = async (req, res) => {
	const user = await User.findOne({email: req.body.email});
	if (user) {
		res
			.status(200)
			.json({ _id: user._id, email: user.email, boards: user.boards });
	} else {
		res.status(404).json({ error: "User not found" });
	}
};

module.exports.signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.create({ name, email, password });

		const token = createJWT(user._id, user.email);

		res.cookie("jwt", token);
		res.status(200).json({ _id: user._id, email: user.email, token });
	} catch (err) {
		console.log(err);
		res.status(503).json(err);
	}
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			const token = createJWT(user._id, user.email);
			res.cookie("jwt", token);

			res.status(200).json({ _id: user._id, email: user.email, token });
		} else {
			res.status(403).json({ error: "Password doesn't match" });
		}
	} else {
		res.status(400).json({ error: "Email doesn't exist" });
	}
};

module.exports.logout = (req, res) => {
	res.status(202).clearCookie("jwt").send("cleared");
};

module.exports.authenticated = (req, res) => {
	const token = req.cookies?.jwt;
	if (!token) {
		res.json({ isAuthenticated: false });
		return;
	}
	jwt.verify(token, "my secret", (err, user) => {
		if (err) {
			res.json({ isAuthenticated: false });
			return;
		} else {
			res.json({ isAuthenticated: true, _id: user._id, email: user.email });
		}
	});
};
