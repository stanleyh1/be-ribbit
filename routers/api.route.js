const apiRouter = require('express').Router()
const topicsRouter= require('./topics.route.js')


apiRouter.use('/topics', topicsRouter)



// app.get('/api/topics', getTopics);

// app.get('/api/articles/:article_id', getArticlesById)

// app.patch('/api/articles/:article_id', updateArticle)

// app.post('/api/articles/:article_id/comments', postComment)

// app.get('/api/articles', getArticles)

// app.delete('/api/comments/:comment_id', deleteComment)



module.exports = apiRouter