const express = require("express");
const {
  handle404s,
  handlePsqlErrors,
  handleCustomErrors,
  handleInternalErrors,
} = require("./errors/error.handling");

const apiRouter = require("./routes/api.routers");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.all("*", handle404s);

app.use(handlePsqlErrors);

app.use(handleCustomErrors);

app.use(handleInternalErrors);

module.exports = app;
