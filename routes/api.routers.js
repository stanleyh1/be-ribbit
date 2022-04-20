const express = require("express");
const commentRouter = require("./comments.routers");
const { getApi } = require("../controllers/endpoints.controllers");
const { getTopics } = require("../controllers/topics.controllers");
const articleRouter = require("./articles.routers");
const userRouter = require("./users.routers");

const apiRouter = express.Router();

apiRouter.get("/", getApi);

apiRouter.get("/topics", getTopics);

apiRouter.use("/articles", articleRouter);

apiRouter.use("/users", userRouter);

apiRouter.use("/comments", commentRouter)

module.exports = apiRouter;