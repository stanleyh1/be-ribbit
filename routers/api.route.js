const apiRouter = require('express').Router()
const topicsRouter = require('./topics.route')
const articlesRouter = require('./articles.route')
const commentsRouter = require('./comments.route')
const res = require('express/lib/response')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('./articles', articlesRouter)
apiRouter.use('./comments', commentsRouter)

apiRouter.route('/')
.get(( req, res, next) => {
    res.send(endPoints)
})
.all(methodNotAllowed)



// app.get('/api/topics', getTopics);

// app.get('/api/articles/:article_id', getArticlesById)

// app.patch('/api/articles/:article_id', updateArticle)

// app.post('/api/articles/:article_id/comments', postComment)

// app.get('/api/articles', getArticles)

// app.delete('/api/comments/:comment_id', deleteComment)



module.exports = apiRouter