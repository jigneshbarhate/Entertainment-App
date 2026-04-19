const Bookmark = require('../models/Bookmark.js');

// @desc    Get user bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a bookmark
// @route   POST /api/bookmarks
// @access  Private
const createBookmark = async (req, res) => {
  try {
    const { mediaId, mediaType, title, posterPath, releaseDate, rating } = req.body;

    if (!mediaId || !mediaType || !title) {
      return res.status(400).json({ message: 'Please provide mediaId, mediaType, and title' });
    }

    const exists = await Bookmark.findOne({ user: req.user._id, mediaId });
    if (exists) {
      return res.status(400).json({ message: 'Bookmark already exists' });
    }

    const bookmark = await Bookmark.create({
      user: req.user._id,
      mediaId,
      mediaType,
      title,
      posterPath,
      releaseDate,
      rating
    });

    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a bookmark
// @route   DELETE /api/bookmarks/:id
// @access  Private
const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }

    // Check for user
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await bookmark.deleteOne();

    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
