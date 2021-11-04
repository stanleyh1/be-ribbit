const express = require('express');
const { getTopics, getArticlesById, updateArticle, postArticle } = require('./controllers/news.controllers.js');

const app = express()

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById)

app.patch('/api/articles/:article_id', updateArticle)

// app.post('/api/articles', postArticle)

app.post('/api/articles/:article_id/comments', postComment)


module.exports = app;
