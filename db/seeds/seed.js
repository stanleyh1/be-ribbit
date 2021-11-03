const db = require('../connection.js');
const format = require('pg-format');
const articles = require('../data/development-data/articles');
const { mapTopics, mapComments, mapUsers, mapArticles } = require('../utils/utils.js');


const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
  // 2. insert data

  return db
  .query(`DROP TABLE IF EXISTS comments;`)
  .then(() => {
    return db.query('DROP TABLE IF EXISTS articles;')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS users;')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS topics;')
  })
  .then(() => {
    return db.query(`
    CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY,
      description TEXT NOT NULL
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE users (
      username VARCHAR PRIMARY KEY,
      avatar_url VARCHAR,
      name VARCHAR NOT NULL
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username),
      created_at TIMESTAMP DEFAULT NOW()
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      body TEXT NOT NULL
    );`)
  })
  .then(() => {
    const topicValues = mapTopics(topicData)
    return db.query(
      format(
        `INSERT INTO topics(slug, description) VALUES %L RETURNING *;`,
        topicValues
      )
    )
  })
  .then(() => {
    const userValues = mapUsers(userData)
    return db.query(
      format(
        `INSERT INTO users(username, avatar_url, name) VALUES %L RETURNING *;`,
      userValues
      )
    )
  })
  .then(() => {
    const articleValues = mapArticles(articleData)
    
    return db.query(
      format(
        `INSERT INTO articles(title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
        articleValues
      )
    )
  })
  .then(() => {
    const commentValues = mapComments(commentData)
    return db.query(
      format(
        `INSERT INTO comments(author,article_id, votes, created_at, body) VALUES %L RETURNING *;`,
        commentValues
      )
    )
  })
};

module.exports = seed;
