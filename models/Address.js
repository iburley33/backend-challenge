const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: false,
    trim: true,
  },
  zip: {
    type: String,
    required: false,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = addressSchema;
