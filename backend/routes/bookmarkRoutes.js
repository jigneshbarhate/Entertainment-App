const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  createBookmark,
  deleteBookmark,
} = require('../controllers/bookmarkController.js');
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(protect, getBookmarks).post(protect, createBookmark);
router.route('/:id').delete(protect, deleteBookmark);

module.exports = router;
