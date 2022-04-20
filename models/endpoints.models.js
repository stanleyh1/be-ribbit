const fs = require("fs/promises");

exports.fetchEndpoints = () => {
  return fs.readFile("endpoints.json", "utf-8").then((res) => {
    return JSON.parse(res);
  });
};