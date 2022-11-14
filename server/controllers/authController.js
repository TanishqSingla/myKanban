const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function createJWT(_id) {
	return jwt.sign({ _id }, "my secret");
}

module.exports.signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.create({ name, email, password });

		const token = createJWT(user._id);

		res.cookie("jwt", token);
		res.json({ user, token });
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
			const token = createJWT(user._id);
			res.cookie("jwt", token);

			res.status(200).json({ _id: user._id, token });
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
			res.json({ isAuthenticated: true, _id: user._id });
		}
	});
};
