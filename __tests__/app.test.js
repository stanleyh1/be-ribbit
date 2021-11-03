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
    })
    describe('GET', () => {
        it('returns article by article id', () => {
            const article_id = 1;
            return request(app).get(`/api/articles/${article_id}`).expect(200).then(({ body }) => {
                const { article } = body;
                console.log(body)
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
})