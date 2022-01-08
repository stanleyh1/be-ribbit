const express = require('express');

const { handleSomeErrors, handlePsqlErrors } = require('./errors/errors')

const apiRouter = require('./routers/api.route.js')

const app = express()

app.use(express.json());

app.use('/api', apiRouter)

app.use(handleSomeErrors)

app.use(handlePsqlErrors);

module.exports = app;
