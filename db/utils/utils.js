const { articleData, commentData, topicData, userData } = require('../data/development-data/index.js')

const mapComments = commentData.map((comment) => {
    return [comment.author, comment.article_id, comment.votes, comment.created_at, comment.body];
    })

const mapTopics = topicData.map((topic) => {
    return [topic.slug, topic.description];
    })

const mapArticles = articleData.map((article)  => {
    return [article.title, article.body, article.votes, article.topic, article.author, article.created_at];
    })

const mapUsers =   userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
    })

    module.exports = { mapTopics, mapUsers, mapArticles, mapComments} 