const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: false,
    enum: ['Employee', 'Admin'],
    default:'Employee'
  },
});

userSchema.pre("save", async function (next) {
    try {
      if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
