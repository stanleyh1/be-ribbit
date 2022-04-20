const express = require('express')

const {patchCommentById, deleteCommentByCommentId} = require('../controllers/comments.controllers')

const commentRouter = express.Router();

commentRouter.delete("/:comment_id", deleteCommentByCommentId);

commentRouter.patch("/:comment_id", patchCommentById);

module.exports = commentRouter