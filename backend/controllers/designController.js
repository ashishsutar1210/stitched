const Design = require('../models/Design');

// Get all designs
exports.getDesigns = async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create design
exports.createDesign = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    if (!imageUrl) return res.status(400).json({ error: 'Image is required' });
    if (!category) return res.status(400).json({ error: 'Category is required' });
    const design = new Design({ title, description, imageUrl, category });
    await design.save();
    res.status(201).json(design);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete design
exports.deleteDesign = async (req, res) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);
    if (!design) return res.status(404).json({ error: 'Design not found' });
    res.json({ message: 'Design deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 