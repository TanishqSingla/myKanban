const mongoose = require('mongoose');
const CardSchema = require('./cardSchema')

module.exports = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	card: [CardSchema]
});
