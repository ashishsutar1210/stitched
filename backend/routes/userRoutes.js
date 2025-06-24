const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser, uploadUserImages } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });

// All user routes are protected
router.use(protect);

router.route('/')
  .get(getUsers)
  .post(upload.array('images'), createUser);

router.route('/:id')
  .get(getUser)
  .put(upload.array('images'), updateUser)
  .delete(deleteUser);

router.post('/:id/images', upload.array('images'), uploadUserImages);

module.exports = router; 