const db = require('../db/connection');

exports.fetchArticlesById = (article_id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
        if ( rows.length < 1 ) {
        return Promise.reject({
            status: 404,
            msg: `Resource not found`,
            });
    }
    else {
        return rows[0];
    }
    })
};

exports.updateArticleById = (article_id, updatedArticle) => {
    const { body } = updatedArticle;
    return db
    .query('UPDATE articles SET body = $1 WHERE article_id = $2 RETURNING*;', [body, article_id])
    .then(({rows}) => {
        return rows[0];
    })
}

exports.fetchArticles = () => {
    return db
    .query("SELECT * FROM articles;")
    .then(({ rows }) => {
        return rows;
    });
};