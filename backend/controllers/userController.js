const User = require('../models/User');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const { search, limit = 15 } = req.query;
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    const users = await User.find(query).limit(parseInt(limit));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const { name, phone, address, description, dressType, otherDressType, measurements, timeReady } = req.body;
    const images = req.files ? req.files.map(f => f.path) : [];
    const user = new User({
      name, phone, address, description, dressType, otherDressType,
      measurements: measurements ? JSON.parse(measurements) : {},
      timeReady, images
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, phone, address, description, dressType, otherDressType, measurements, timeReady } = req.body;
    const images = req.files ? req.files.map(f => f.path) : undefined;
    const update = {
      name, phone, address, description, dressType, otherDressType,
      measurements: measurements ? JSON.parse(measurements) : undefined,
      timeReady
    };
    if (images && images.length) update.images = images;
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Upload images for a user
exports.uploadUserImages = async (req, res) => {
  try {
    const images = req.files ? req.files.map(f => f.path) : [];
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: images } } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 