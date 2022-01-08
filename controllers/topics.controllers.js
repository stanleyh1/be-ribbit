const articles = require('../db/data/test-data/articles');
const { fetchTopics } = require('../models/topics.models')

exports.getTopics = (req, res, next) => {
        fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    })
    .catch(next)
};