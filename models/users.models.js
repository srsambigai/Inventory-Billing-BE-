const mongoose = require("mongoose");

// Create Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    enum: [1, 2, 3],
    default: 3,
  },
  address: {
    type: String,
    required: true,
  },
});
mongoose.pluralize(null);
module.exports = mongoose.model("Users", userSchema);

// Welcome123 -> Welcome123
// To store our password in a secured way (Hashing)
//  -> Hashing -> transforming data from one form to another (non-readable) Welcome123 -> AFAFWEFWR@#4adadadadw

// Maintain user data in the form of (Token)
//  -> Encryption -> transforming data from one form to another (non-readable) Welcome123 -> ADfwfdqd2e23edd -> Welcome123

// Role
// 1. Admin
// 2. Privileged User
// 3. Normal User