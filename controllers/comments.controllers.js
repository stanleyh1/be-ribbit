const articles = require('../db/data/test-data/articles');
const { insertComment, deleteCommentById } = require('../models/comments.models')
exports.postComment = (req, res, next) => {
    
    const newComment = req.body;
    insertComment(newComment) 
    .then((comment) => {
        res.status(201).send({ comment })
    })
    .catch(next)
    
}

exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentById(comment_id)
    .then(() => {
        res.sendStatus(204);
    })
    .catch(next)
};