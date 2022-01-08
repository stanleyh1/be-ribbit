const articlesRouter = require('express').Router()
const { getArticles, getArticlesById, updateArticle } = require('../controllers/articles.controllers')

articlesRouter.route('/')
.get(getArticlesById, getArticles)
.patch(updateArticle)

module.exports = articlesRouter