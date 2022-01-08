const db = require('../db/connection');


exports.insertComment = (newComment) => {
    
    const { author, article_id, body} = newComment;

    return db
    .query('INSERT INTO comments (author, article_id, body) VALUES ($1, $2, $3) RETURNING *;', [author, article_id, body])
    .then(({ rows }) => {
        return rows[0];
    })
}

exports.deleteCommentById = (comment_id) => {
    if ({ rows } < 1) { return Promise.reject({ status: 404, msg: 'Path not found' }); 
    }
    else {
    return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
    }
}