const { fetchTopics, fetchArticlesById, updateArticleById, insertArticle } = require('../models/news.models.js')


exports.getTopics = (req, res) => {
    fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch((err) => {
        next()
    })
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

// exports.postArticle = (req, res, next) => {
    
//     const newArticle = req.body;
//     console.log(req.body)
//     insertArticle(newArticle) 
//     .then((article) => {
//         res.status(201).send({ article });
//     })
//     .catch((err) => {
//         console.log(err)
//         next(err)
//     })
    
// }

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