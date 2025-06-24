const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema({
  sleeveLength: String,
  sleeveWidth: String,
  shoulder: String,
  waist: String,
  chest: String,
  height: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  description: String,
  dressType: { type: String, required: true },
  otherDressType: String,
  measurements: measurementSchema,
  timeReady: Date,
  timeSubmitted: { type: Date, default: Date.now },
  images: [String], // Cloudinary URLs
});

module.exports = mongoose.model('User', userSchema); 