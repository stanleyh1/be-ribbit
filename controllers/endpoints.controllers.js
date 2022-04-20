const { fetchEndpoints } = require("../models/endpoints.models");

exports.getApi = (req, res, next) => {
  fetchEndpoints()
    .then((endpoints) => {
      res.status(200).send(endpoints);
    })
    .catch(next)
};