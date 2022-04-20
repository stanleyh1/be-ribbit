const db = require("../db/connection");

exports.removeCommentById = (comment_id) => {
  return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, 
    [comment_id,])
    .then((res) => {
      if (res.rowCount === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
    });
};

exports.updateCommentById = (comment_id, inc_votes) => {
return db.query(`UPDATE comments SET votes = votes + ($2)
WHERE comment_id = $1 RETURNING *;`, [comment_id, inc_votes])
.then((res)=> {
  if(res.rows.length){
    return res.rows[0]
  } else {
    return Promise.reject({status:404, msg: "Path not found"})
  }
});
};