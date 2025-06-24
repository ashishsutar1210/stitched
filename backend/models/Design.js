const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: { type: String, required: true }, // Cloudinary   URL
  createdAt: { type: Date, default: Date.now },
  category: { type: String, enum: ['Dress', 'Blouse', 'Suit', 'Other'], required: true },
});

module.exports = mongoose.model('Design', designSchema); 