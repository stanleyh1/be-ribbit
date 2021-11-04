const { fetchTopics, fetchArticlesById, updateArticleById, insertComment, fetchArticles } = require('../models/news.models.js')


exports.getTopics = (req, res, next) => {
        fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(next)
};


exports.getArticlesById = (req, res) => {
    const { article_id } = req.params;
    fetchArticlesById(article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
}


exports.updateArticle = (req, res) => {
    const { article_id } = req.params;

    if(Object.keys(req.body).length === 0) {
        res.status(400).send();
    } else {
        const updatedArticle = req.body;
        updateArticleById(article_id, updatedArticle)
        .then((article) => {
            res.status(200).send({ article })
        })
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

exports.getArticles = (req, res) => {
    fetchArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
    .catch((err) => {
        next()
    })
};

// exports.getCommentsByArticleId = (req, res) => {
//     const { article_id } = req.params;
//     console.log(article_id)
//     fetchCommentsByArticleId()
//     .then((comments) => {
//         res.status(200).send({ comments })
//     })
// }
