const db = require("../db/connection");

exports.fetchArticles = (sort_by = "created_at", order = "desc", topic, limit = 10, p) => {
  const SortBys = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  if (!SortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  if (!["asc", "desc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid Order" });
  }

  let queryString = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count
  FROM articles
  LEFT JOIN comments
  ON articles.article_id = comments.article_id
  `;
  const queryValue = [];

  if (topic) {
    queryValue.push(topic);

    queryString += `WHERE articles.topic = $1`;
  }

  queryString += `
  GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order}`;
  if(p){
      const calculateRows = (p -1) * limit;
      queryString += ` LIMIT ${limit} OFFSET ${calculateRows};`
  }
  queryString+= `;`
  
  return db.query(queryString, queryValue).then((res) => {
    if (topic && res.rows.length === 0) {
      return db.query(`SELECT * FROM topics WHERE slug = $1;`, [topic])
        .then((validTopic) => {
          if (!validTopic.rows.length) {
            return Promise.reject({ status: 404, msg: "Topic not found" });
          }
          return res.rows;
        });
    }
    return res.rows;
  });
};

exports.fetchArticleById = (article_id) => {
  return db.query(
      `SELECT articles.*, COUNT(comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments
      ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
      GROUP BY articles.article_id;`,
      [article_id]
    )
    .then((res) => {
      if (res.rows.length) {
        return res.rows[0];
      } else {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
    });
};

exports.updateArticleById = (article_id, newVote = 0, body) => {
  const params = Object.keys(body);
  if (params.some((key) => key !== "inc_votes")) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  if (typeof newVote !== "number") {
    return Promise.reject({ status: 400, msg: "Invalid input" });
  }
  return db.query(`UPDATE articles SET votes = votes + ($2) 
    WHERE article_id = $1 RETURNING *;`,
      [article_id, newVote]
    )
    .then((res) => {
      if (res.rows.length) {
        return res.rows[0];
      } else {
        return Promise.reject({ status: 404, msg: "Path not found" });
      }
    });
};

exports.fetchCommentByArticleId = (article_id) => {
  return db.query(
    `SELECT * FROM comments
    WHERE article_id = $1;`,
      [article_id]
    )
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Comments not found`,
        });
      }
      return res.rows;
    });
};

exports.addCommentById = (article_id, username, body) => {
  return db.query(
      `INSERT INTO comments
  (article_id, author, body)
  VALUES ($1, $2, $3)
  RETURNING *;`,
      [article_id, username, body]
    )
    .then((res) => {
      res;
      return res.rows[0];
    });
};

exports.removeArticleById = (article_id) => {
  return db.query(`DELETE FROM articles WHERE article_id = $1 RETURNING *;`, 
    [article_id,])
    .then((res) => {
      if (res.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    });
};

exports.addArticle = (author, topic, title, body) => {
  return db.query(
      `INSERT INTO articles
  (author, topic, title, body)
  VALUES ($1, $2, $3, $4)
  RETURNING *;`,
      [author, topic, title, body]
    )
    .then((res) => {
      res;
      console.log(res.rows)
      return res.rows[0];
    });
};
