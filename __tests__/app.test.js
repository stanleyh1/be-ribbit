const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");


beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET/api/articles", () => {
  test("status: 200 returns an array of all articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((articleArray) => {
        expect(Array.isArray(articleArray.body.articles)).toEqual(true);
        articleArray.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
            topic: expect.any(String),
            author: expect.any(String),
            created_at: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
  test("status: 200 articles are sorted by the date they were created", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("created_at", {
          descending: true,
        });
      });
  });
  test("status: 200 articles are sorted by a query passed in by the user", () => {
    return request(app)
      .get("/api/articles/?sort_by=author")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("author", {
          descending: true,
        });
      });
  });
  test("status: 200 users query determines the sort order", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeSortedBy("created_at", {
          ascending: true,
        });
      });
  });
  test("status: 200 articles are filtered by topic query", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then((res) => {
        res.body.articles.forEach((article) => {
          expect(article.topic).toBe("cats");
        });
      });
  });
  test("status: 200 takes a p query and returns articles in the requested limit", ()=>{
    return request(app)
    .get("/api/articles?p=2")
    .expect(200)
    .then((res) => {
      expect(res.body.articles).toHaveLength(2)
    })
  })
  test('status: 404 returns "Topic not found" for a topic that does not exist', () => {
    return request(app)
      .get("/api/articles?topic=frogs")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Topic not found");
      });
  });
  test('status: 400 returns "Invalid Order" for a response that is not ascending or descending', () => {
    return request(app)
      .get("/api/articles?order=random")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid Order");
      });
  });
  test('status: 400 returns "Bad request" for an invalid sort query', () => {
    return request(app)
      .get("/api/articles?sort_by=area")
      .expect(400)
      .then((articlesArray) => {
        expect(articlesArray.body.msg).toBe("Bad request");
      });
  });
});
describe("POST/api/articles", () => {
  test("status: 201 returns a newly created article", () => {
    const article = {
      author: "rogersop",
      title: "frogs are amphibians",
      body: "frog, any of various tailless amphibians belonging to the order Anura. Used strictly, the term may be limited to any member of the family Ranidae (true frogs), but more broadly the name frog is often used to distinguish the smooth-skinned, leaping anurans from squat, warty, hopping ones, which are called toads.",
      topic: "mitch"
    };
    return request(app)
      .post("/api/articles")
      .send(article)
      .expect(201)
      .then((res) => {
        expect(res.body.article).toBeInstanceOf(Object);
        expect(res.body.article).toEqual({
            article_id: expect.any(Number),
            title: "frogs are amphibians",
            body: "frog, any of various tailless amphibians belonging to the order Anura. Used strictly, the term may be limited to any member of the family Ranidae (true frogs), but more broadly the name frog is often used to distinguish the smooth-skinned, leaping anurans from squat, warty, hopping ones, which are called toads.",
            votes: expect.any(Number),
            topic: "mitch",
            author: "rogersop",
            created_at: expect.any(String),
        });
      });
  });
  test("status: 400 returns 'Invalid input' when an author does not exist", () => {
    const article = {
      title: "frogs are amphibians",
      body: "frog, any of various tailless amphibians belonging to the order Anura. Used strictly, the term may be limited to any member of the family Ranidae (true frogs), but more broadly the name frog is often used to distinguish the smooth-skinned, leaping anurans from squat, warty, hopping ones, which are called toads.",
      topic: "mitch"
    };
    return request(app)
      .post("/api/articles")
      .send(article)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test("status: 400 returns 'Invalid input' when the topic does not exist", () => {
    const article = {
      author: "rogersop",
      title: "frogs are amphibians",
      body: "frog, any of various tailless amphibians belonging to the order Anura. Used strictly, the term may be limited to any member of the family Ranidae (true frogs), but more broadly the name frog is often used to distinguish the smooth-skinned, leaping anurans from squat, warty, hopping ones, which are called toads."
    };
    return request(app)
      .post("/api/articles")
      .send(article)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Invalid input");
      });
  });
  test('status: 400 returns "Invalid input" when an empty object is passed in as a request', () => {
    const article = {};
    return request(app)
      .post("/api/articles")
      .send(article)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});
describe("GET/api/articles/:article_id", () => {
  test("status: 200 returns an article with the requested article id", () => {
    return request(app)
      .get(`/api/articles/${1}`)
      .expect(200)
      .then((res) => {
        expect(typeof res.body.article).toBe("object");
        expect(res.body.article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2020-07-09T20:11:00.000Z",
            comment_count: "11",
          })
        );
      });
  });
  test('status: 400 returns "Invalid input" when an invalid article id is passed in', () => {
    return request(app)
      .get("/api/articles/abc")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test('status: 404 returns "Article not found"', () => {
    return request(app)
      .get("/api/articles/99999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Article not found");
      });
  });
});
describe("PATCH/api/articles/:article_id", () => {
  test("status: 200 returns the newly updated article by article Id", () => {
    const newVote = { inc_votes: 10 };
    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(200)
      .then((res) => {
        expect(typeof res.body.article).toBe("object");
        expect(res.body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          body: "I find this existence challenging",
          votes: 110,
          topic: "mitch",
          author: "butter_bridge",
          created_at: "2020-07-09T20:11:00.000Z",
        });
      });
  });
  test('status: 400 returns "Invalid input" when the update is the wrong data type', () => {
    const newVote = { inc_votes: "ribbit" };
    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test('status: 404 returns "Path not found" when updating an article with an incorrect id', () => {
    const newVote = { inc_votes: 1 };
    return request(app)
      .patch("/api/articles/999999999")
      .send(newVote)
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found");
      });
  });
  test('status: 400 returns "Invalid input" when the user tries to update more than one property', () => {
    const newVote = { inc_votes: 1, author: "butter_bridge" };
    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request");
      });
  });
  test('status: 200 returns "Invalid input" when trying to update with an empty object', () => {
    const newVote = {};
    return request(app)
      .patch("/api/articles/1")
      .send(newVote)
      .expect(200)
      .then((res) => {
        expect(typeof res.body.article).toBe("object");
        expect(res.body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          body: "I find this existence challenging",
          votes: 100,
          topic: "mitch",
          author: "butter_bridge",
          created_at: "2020-07-09T20:11:00.000Z",
        });
      });
  });
});
describe("DELETE/api/articles/:article_id", () => {
  test("status: 204 deletes current article by the article id", () => {
    return request(app)
      .delete("/api/articles/2")
      .expect(204)
      .then((res) => res.body);
  });
  test('status: 404 returns "Not found" when trying to delete an article with an article id that does not exist', () => {
    return request(app)
      .delete("/api/articles/99999999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
  test('status: 404 returns "Path not found" when the wrong URL is entered', () => {
    return request(app)
      .delete("/api/articl/1")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found");
      });
  });
});
describe("GET/api/articles/:article_id/comments", () => {
  test("status: 200 returns an array of comments with the requested article Id", () => {
    return request(app)
      .get(`/api/articles/1/comments`)
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.comments)).toBe(true);
        res.body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          });
        });
      });
  });
  test('status: 404 returns "Comments not found" when there are no comments with the requested article Id', () => {
    return request(app)
      .get("/api/articles/999/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Comments not found");
      });
  });
  test('status: 404 returns "Path not found" when request is made with an incorrect URL', () => {
    return request(app)
      .get("/api/articl/1/comments")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found");
      });
  });
});
describe("POST/api/articles/:article_id/comments", () => {
  test("status: 200 returns a newly created comment ", () => {
    const comment = {
      username: "rogersop",
      body: "frogs are amphibians",
      votes: 0,
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toBeInstanceOf(Object);
        expect(res.body.comment).toEqual({
          article_id: 1,
          comment_id: 19,
          votes: 0,
          created_at: expect.any(String),
          author: "rogersop",
          body: "frogs are amphibians",
        });
      });
  });
  test("status: 200 returns a newly posted comment by article Id", () => {
    const comment = {
      username: "rogersop",
      body: "frogs are amphibians",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment).toBeInstanceOf(Object);
        expect(res.body.comment).toEqual({
          article_id: 1,
          comment_id: 19,
          votes: 0,
          created_at: expect.any(String),
          author: "rogersop",
          body: "frogs are amphibians",
        });
      });
  });
  test("status: 400 returns 'Invalid input' when a username does not exist", () => {
    const newComment = {
      username: "frogs_are_amphibians",
      body: "ribbit",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
  test("status: 400 returns 'Invalid input' when the article Id does not exist", () => {
    const comment = {
      username: "rogersop",
      body: "frogs are amphibians",
    };
    return request(app)
      .post("/api/articles/9999999/comments")
      .send(comment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toEqual("Invalid input");
      });
  });
  test('status: 400 returns "Invalid input" when an empty object is passed in as a request', () => {
    const comment = {};
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid input");
      });
  });
});
describe("DELETE/api/comments/:comment_id", () => {
  test("status: 204 deletes current comment by the comment id", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
      .then((res) => res.body);
  });
  test('status: 404 returns "Not found" when trying to delete a comment with a comment id that does not exist', () => {
    return request(app)
      .delete("/api/comments/99999999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not found");
      });
  });
  test('status: 404 returns "Path not found" when the wrong URL is entered', () => {
    return request(app)
      .delete("/api/article/comment/1")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found");
      });
  });
});
describe("PATCH/api/comments/:comment_id", ()=>{
  test("status: 200 returns the newly updated comment", ()=>{
    return request(app)
    .patch("/api/comments/1")
    .send({inc_votes: 1})
    .expect(200)
    .then((res) => {
      expect(res.body.comment.votes).toEqual(17)
    })  
  })
  test("status: 404 returns 'Path not found' when trying to patch a comment with a comment id that does not exist", ()=>{
    return request(app)
    .patch("/api/comments/99999")
    .send({inc_votes: 1})
    .expect(404)
    .then((res) => {
      expect(res.body.msg).toBe("Path not found")
    })
  })
})
describe("GET/api/topics", () => {
  test("status: 200 returns an array of all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
        expect(res.body.topics).toHaveLength(3);
        res.body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test('status: 404 returns "Path not found" when request is made with an incorrect URL', () => {
    return request(app)
      .get("/api/topic")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found");
      });
  });
});
describe("GET/api/users", () => {
  test("status: 200 returns an array of users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body.users)).toEqual(true);
        res.body.users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
          });
        });
      });
  });
  test("status: 404 returns 'Path not found' when request is made with an incorrect URL", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found")
      });
  });
});

