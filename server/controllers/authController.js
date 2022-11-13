const User = require("../models/User");
const jwt = require("jsonwebtoken");

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

module.exports.login = (req, res) => {
	const { email, password } = req.body;
	console.log(email, password);
	res.status("sign in").json();
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
			res.json({ isAuthenticated: true, _id: user._id});
		}
	});
};
