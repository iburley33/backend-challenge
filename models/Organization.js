const mongoose = require("mongoose");
const addressSchema = require("./Address");

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  addresses: [addressSchema],
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
