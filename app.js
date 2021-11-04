const express = require('express');
const { getTopics, getArticlesById, updateArticle, postComment, getArticles } = require('./controllers/news.controllers.js');
const { handleInvalidPaths } = require('./errors/errors')

const app = express()

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById)

app.patch('/api/articles/:article_id', updateArticle)

app.post('/api/articles/:article_id/comments', postComment)

app.get('/api/articles', getArticles)

app.all('/*', handleInvalidPaths)

// app.get('/api/articles/:article_id/comments', getCommentsByArticleId)



module.exports = app;
