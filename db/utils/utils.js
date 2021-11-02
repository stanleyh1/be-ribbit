

const mapComments = (commentData) => { return commentData.map((comment) => {
    return [comment.author, comment.article_id, comment.votes = 0, comment.created_at, comment.body];
    })
    }

const mapTopics = (topicData) => { return topicData.map((topic) => {
    return [topic.slug, topic.description];
    })
    }

const mapArticles = (articleData) => { return articleData.map((article)  => {
    return [article.title, article.body, article.votes = 0, article.topic, article.author, article.created_at];
    })
    }

const mapUsers = (userData) => { return userData.map((user) => {
    return [user.username, user.avatar_url, user.name];
    })
    }

    module.exports = { mapTopics, mapUsers, mapArticles, mapComments} 