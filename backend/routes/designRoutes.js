const express = require('express');
const { getDesigns, createDesign, deleteDesign } = require('../controllers/designController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });
const router = express.Router();

router.get('/', getDesigns);
router.post('/', protect, upload.single('image'), createDesign);
router.delete('/:id', protect, deleteDesign);

module.exports = router; 