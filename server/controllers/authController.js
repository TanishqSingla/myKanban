const User = require("../models/User");
const jwt = require("jsonwebtoken");

function createJWT(id) {
	return jwt.sign({ id }, "my secret");
}

module.exports.signup = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const user = await User.create({ name, email, password });

		const token = createJWT(user._id);

    res.cookie('jwt', token);
		res.json({user, token});
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
