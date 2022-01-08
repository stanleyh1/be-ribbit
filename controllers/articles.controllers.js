const articles = require('../db/data/test-data/articles');
const { fetchArticlesById, updateArticleById, fetchArticles } = require('../models/articles.models')

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

exports.getArticles = (req, res, next) => {
    fetchArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
    .catch(next)
};