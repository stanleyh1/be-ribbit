const db = require('../db/connection');

exports.fetchTopics = () => {
    return db
    .query("SELECT * FROM topics;")
    .then(({ rows }) => {
        return rows;
    });
};

exports.fetchArticlesById = (article_id) => {
    return db
    .query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
    .then(({ rows }) => {
        return rows[0];
    });
};

exports.updateArticleById = (article_id, updatedArticle) => {
    const { body } = updatedArticle;
    return db
    .query('UPDATE articles SET body = $1 WHERE article_id = $2 RETURNING*;', [body, article_id])
    .then(({rows}) => {
        return rows[0];
    })
}


// exports.insertArticle = (newArticle) => {
//     const { title, topic, body } = newArticle;

//     return db
//     .query('INSERT INTO articles (title, topic, body ) VALUES ($1, $2, $3) RETURNING *;', [title, topic, body])
//     .then(({ rows }) => {
//         return rows[0];
//     })
// }

exports.insertComment = (newComment) => {
    
    const { author, article_id, body} = newComment;

    return db
    .query('INSERT INTO comments (...) VALUES ($1, $2, $3) RETURNING *;', [author, article_id, body])
    .then(({ rows }) => {
        return rows[0];
    })
}


