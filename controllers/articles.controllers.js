const {
  fetchArticles,
  fetchArticleById,
  updateArticleById,
  fetchCommentByArticleId,
  addCommentById,
  removeArticleById,
  addArticle
} = require("../models/articles.models");

exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic, limit, p } = req.query;
  fetchArticles(sort_by, order, topic, limit, p)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next)
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next)
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleById(article_id, inc_votes, req.body)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next)
};

exports.getCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  fetchCommentByArticleId(article_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next)
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;

  addCommentById(article_id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next)
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  removeArticleById(article_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next)
};

exports.postArticle = (req, res, next) => {
  const { author, topic, title, body } = req.body;

  return addArticle(author, topic, title, body)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next)
};

