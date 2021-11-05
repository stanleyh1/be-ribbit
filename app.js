const express = require('express');
const { getTopics, getArticlesById, updateArticle, postComment, getArticles, deleteComment } = require('./controllers/news.controllers.js');
const { handleInvalidPaths, handleInvalidIds } = require('./errors/errors')

const app = express()

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById)

app.patch('/api/articles/:article_id', updateArticle)

app.post('/api/articles/:article_id/comments', postComment)

app.get('/api/articles', getArticles)

app.delete('/api/comments/:comment_id', deleteComment)

app.all('/*', handleInvalidPaths, handleInvalidIds)





module.exports = app;
