const db = require('../');
const format = require('pg-format');
const articles = require('../data/development-data/articles');
const utils = require('./utils.js');

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
    return db.query('DROP TABLE IF EXISTS users')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS topics')
  })
  .then(() => {
    return db.query(`
    CREATE TABLE topics (
      slug VARCHAR PRIMARY KEY NOT NULL,
      description TEXT NOT NULL,
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE users (
      username VARCHAR PRIMARY KEY NOT NULL,
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
      topic VARCHAR REFERENCES topics(slugs) NOT NULL,
      author VARCHAR REFERENCES users(username) NOT NULL,
      created_at CURRENT-TIMESTAMP
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULTS 0,
      created_at CURRENT-TIMESTAMP,
      body TEXT
    );`)
  })
  .then(() => {
    return db.query(
      format(
        `INSERT INTO topics(username, avatar, name) VALUES %L RETURNING *;`,
        mapTopics
      )
    )
  })
  .then(() => {
    return db.query(
      format(
        `INSERT INTO users(username, avatar_url, name) VALUES %L RETURNING *;`,
      mapUsers
      )
    )
  })
  .then(() => {
    return db.query(
      format(
        `INSERT INTO articles(title, body, votes, topic, author, created_at) VALUES %L RETURNING *;`,
        mapArticles
      )
    )
  })
  .then(() => {
    return db.query(
      format(
        `INSERT INTO comments(author,article_id, votes, created_at, body) VALUES %L RETURNING *;`,
        mapComments
      )
    )
  })
};

module.exports = seed;
