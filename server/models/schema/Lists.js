const mongoose = require('mongoose');
const { v4 } = require('uuid');

module.exports = mongoose.Schema({
    title: String
});