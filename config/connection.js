const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/backendChallengeDB");

module.exports = mongoose.connection;
