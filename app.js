const express = require('express');
const { getTopics, getArticlesById } = require('./controllers/news.controllers.js');

const app = express()

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById)


module.exports = app;
