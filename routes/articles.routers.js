const express = require("express");
const {
  getArticleById,
  patchArticleById,
  getArticles,
  getCommentByArticleId,
  postCommentByArticleId,
  deleteArticleById,
  postArticle
} = require("../controllers/articles.controllers");

const articleRouter = express.Router();

articleRouter.get("/:article_id", getArticleById);

articleRouter.patch("/:article_id", patchArticleById);

articleRouter.get("/", getArticles);

articleRouter.post("/", postArticle);

articleRouter.get("/:article_id/comments", getCommentByArticleId);

articleRouter.post("/:article_id/comments", postCommentByArticleId);

articleRouter.delete("/:article_id", deleteArticleById)


module.exports = articleRouter;