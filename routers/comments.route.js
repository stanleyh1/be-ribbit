const commentsRouter = require('express').Router()
const { postComment, deleteComment } = require('../controllers/comments.controllers')

commentsRouter.route('/')
.post( postComment )
.delete( deleteComment )

module.exports = commentsRouter