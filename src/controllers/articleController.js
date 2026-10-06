const Article = require('../models/articleModel');
const articleValidation = require('../validation/articleValidation');

// GET all articles
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};

// GET one article
const getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        error: 'Article not found'
      });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};

// CREATE an article
const createArticle = async (req, res) => {
  try {
    const { error } = articleValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    const { title, content } = req.body;

    const article = await Article.create({
      title,
      content,
      userId: req.user.userId
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};

// UPDATE an article
const updateArticle = async (req, res) => {
  try {
    const { error } = articleValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        error: 'Article not found'
      });
    }

    if (article.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        error: 'You are not allowed to edit this article'
      });
    }

    const { title, content } = req.body;

    article.title = title;
    article.content = content;

    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};

// DELETE an article
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        error: 'Article not found'
      });
    }

    if (article.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({
        error: 'You are not allowed to delete this article'
      });
    }

    await Article.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Article deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
};

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
};