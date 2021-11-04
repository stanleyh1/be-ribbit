const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest')
const app = require('../app')

beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('/api/topics', () => {
    describe('GET', () => {
        test('status:200, responds with an object of all topics', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                const { topics } = body;
                expect(topics).toBeInstanceOf(Array);
                expect(topics).toHaveLength(3);
                topics.forEach((topic) => {
                expect(topic).toEqual(
                expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
                })
                );
                });
            })
        })
        test('status:404, responds with message Path not found', () => {
            return request(app).get('/api/topic').expect(404).then(({body}) => {
                expect(body).toEqual({
                "message": "Path not found"
                })
            }) 
        })
    })
})

describe('/api/articles', () => { 
    describe('GET', () => {
        it('returns article by article id', () => {
            const article_id = 1;
            return request(app).get(`/api/articles/${article_id}`).expect(200).then(({ body }) => {
                const { article } = body;
                expect(article).toBeInstanceOf(Object);
                expect(article).toEqual(
                expect.objectContaining({
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                })
                );
                
            })
        })
    })
    describe('PATCH', () => {
        it('status:200, responds with the updated article', () => {
            const articleUpdates = {
            article_id: 1,
            body: 'I love debugging code',
            };
            return request(app)
            .patch('/api/articles/1')
            .send(articleUpdates)
            .expect(200)
            .then(({ body }) => {
            expect(body.article).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I love debugging code',
                created_at: expect.any(String),
                votes: 100
            });
            });
        });
    });
    describe('POST', () => {
        test('status:201, responds with a newly created comment', () => {
            const newComment = {
                body: "Horses are not made of meat",
                votes: 0,
                author: "butter_bridge",
                article_id: 9,
                created_at: new Date(1586179020000),
                }
            return request(app).post('/api/articles/9/comments').send(newComment).expect(201).then(({body}) => {
                expect(body.comment).toEqual({
                comment_id: expect.any(Number),
                author: "butter_bridge",
                article_id: 9,
                votes: 0,
                created_at: expect.any(String),
                body: "Horses are not made of meat"
                })
            })
        })
    })
    describe('GET', () => {
        test('status:200, responds with an object of all articles', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({body}) => {
                const { articles } = body;
                expect(articles).toBeInstanceOf(Array);
                expect(articles).toHaveLength(12);
                articles.forEach((article) => {
                expect(article).toEqual(
                expect.objectContaining({
                    title: expect.any(String),
                    topic: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                })
                );
                });
            })
        })
    })
//     describe('GET', () => {
//         it('returns comments by article id', () => {
//             const article_id = 1;
//             return request(app).get(`/api/articles/${article_id}/comments`).expect(200).then(({ body }) => {
//                 const { comments } = body;
//                 expect(comments).toBeInstanceOf(Array);
//                 expect(comments).toHaveLength(18);
//                 comments.forEach((comment) => {
//                 expect(comment).toEqual(
//                 expect.objectContaining({
//                     body: expect.any(String),
//                     votes: expect.any(Number),
//                     author: expect.any(String),
//                     article_id: expect.any(Number),
//                     created_at: expect.any(String)
//                 })
//                 )
//             })
//             })
//         })
//     })
// 
});
