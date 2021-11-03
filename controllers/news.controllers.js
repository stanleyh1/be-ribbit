const { fetchTopics, fetchArticlesById } = require('../models/news.models.js')

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
