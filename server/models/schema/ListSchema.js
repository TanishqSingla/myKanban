const mongoose = require('mongoose');
const CardSchema = require('./cardSchema')

module.exports = new mongoose.Schema({
	title: String,
	card: [CardSchema]
});
