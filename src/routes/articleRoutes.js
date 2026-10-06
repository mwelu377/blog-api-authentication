const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

const router = express.Router();

// GET all articles
router.get('/', requireAuth, getArticles);

// GET one article
router.get('/:id', requireAuth, getArticle);

// CREATE an article
router.post('/', requireAuth, createArticle);

// UPDATE an article
router.put('/:id', requireAuth, updateArticle);

// DELETE an article
router.delete('/:id', requireAuth, deleteArticle);

module.exports = router;