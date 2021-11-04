const { fetchTopics, fetchArticlesById, updateArticleById, insertComment, fetchArticles, deleteCommentById } = require('../models/news.models.js')


exports.getTopics = (req, res, next) => {
        fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(next)
};


exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticlesById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
}


exports.updateArticle = (req, res, next) => {
    const { article_id } = req.params;

    if(Object.keys(req.body).length === 0) {
        res.status(400).send();
    } else {
        const updatedArticle = req.body;
        updateArticleById(article_id, updatedArticle)
        .then((article) => {
            res.status(200).send({ article })
        })
        .catch(next)
    }
}

exports.postComment = (req, res, next) => {
    
    const newComment = req.body;
    insertComment(newComment) 
    .then((comment) => {
        res.status(201).send({ comment })
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
    
}

exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
    .catch(next)
};
exports.deleteComment = (req, res, next) => {
    const { comment_id } = req.params;
    deleteCommentById(comment_id)
    .then(() => {
        res.sendStatus(204);
    })
    .catch(next)
};

// exports.getCommentsByArticleId = (req, res, next) => {
//     console.log(req.params, 'req.params!')
//     const { article_id } = req.params;
//     fetchCommentsByArticleId(article_id)
//     .then((comments) => {
//         res.status(200).send({ comments })
//     })
//     .catch(next)
// }

