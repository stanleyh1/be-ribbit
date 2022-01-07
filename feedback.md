# Hannah

## seed

- missing a few `NOT NULL` constraints you might find helpful for error handling
tidy things up
- consider extracting out table creations/drops/insertions into their own functions to tidy things up
- nice and tidy otherwise!
- remove commented out console.logs

## routes
- no routers! Please make use of routers to organise your different endpoints!

## controllers
- consider the scale this project my reach. extract your controllers into files depending on what they are interacting with.
- `updateArticle` - you probably want to ensure your error handling is handled in one place. You might also find this isn't an error in our books!
- nice neat functions
- consistent `.catch` blocks
- nice use of destructuring


## models

- a few pieces of error handling missing I reckon.
- `fetchArticles` not complete yet
- `deleteCommentById` - some weird error handling here before you've even queried the db!

## errors

- good start to error handlers, missing a few.
- not invoking `next` to move on to the next error handler

## misc
- remove console.logs!
- remove commented out code
- remember to add a readme and remove unnecessary `.md` files when you're done with them.



## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### ESSENTIAL GET `/api/articles`

Assertion: the first article should have `article_id === 3`: expected 1 to equal 3

Hints:
- the default sort should be by `created_at` and the default order should be `desc`


### ESSENTIAL GET `/api/articles`

Assertion: Cannot read properties of undefined (reading 'toString')

Hints:
- add a `comment_count` property to each article
- join to the `comments` table, as this information lives there
- use an aggregate `COUNT` function
- use `GROUP BY` to avoid duplicate rows


### ESSENTIAL GET `/api/articles?sort_by=author`

Assertion: expected 'butter_bridge' to equal 'rogersop'

Hints:
- accept a `sort_by` query, with a value of any column name
- use `author` for the column to store the username that created the article


### ESSENTIAL GET `/api/articles?order=asc`

Assertion: expected 'Living in the shadow of a great man' to equal 'Z'

Hints:
- accept an `order` query of `asc` or `desc`


### ESSENTIAL GET `/api/articles?topic=mitch`

Assertion: all articles should be by the topic in the query: expected [ Array(12) ] to satisfy [Function]

Hints:
- accept an `topic` query of any topic slug that exists in the database
- use `where` in the model


### ESSENTIAL GET `/api/articles?topic=paper`

Assertion: expected [ Array(12) ] to deeply equal []

Hints:
- give a 200 status and an empty array when articles for a topic that does exist, but has no articles is requested
- use a separate model to check whether the topic exists


### ESSENTIAL GET `/api/articles?topic=not-a-topic`

Assertion: expected 200 to equal 404

Hints:
- use a 404 status code, when provided a non-existent topic
- use a separate model to check whether the topic exists


### ESSENTIAL GET `/api/articles/1`

Assertion: expected { Object (article_id, title, ...) } to contain keys 'article_id', 'body', 'title', 'topic', 'author', 'created_at', 'votes', and 'comment_count'

Hints:
- send the article to the client in an object, with a key of `article`: `{ article: {} }`
- return the single article in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names


### ESSENTIAL GET `/api/articles/1`

Assertion: Cannot read properties of undefined (reading 'toString')

Hints:
- ensure you have calculated a comment_count for the article


### ESSENTIAL GET `/api/articles/dog`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### ESSENTIAL PATCH `/api/articles/1`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### ESSENTIAL PATCH `/api/articles/1`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### ESSENTIAL PATCH `/api/articles/1`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### ESSENTIAL PATCH `/api/articles/1`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### ESSENTIAL PATCH `/api/articles/1`

Assertion: expected 400 to equal 200

Hints:
- ignore a `patch` request with no information in the request body, and send the unchanged article to the client


### ESSENTIAL PATCH `/api/articles/1`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### ESSENTIAL GET `/api/articles/1/comments`

Assertion: expected 404 to equal 200

Hints:
- use a 200: OK status code for a successful `GET` request


### ESSENTIAL GET `/api/articles/1/comments`

Assertion: expected undefined to be an array

Hints:
- send comments in an array, with a key of `comments`


### ESSENTIAL GET `/api/articles/1/comments`

Assertion: Cannot read properties of undefined (reading '0')

Hints:
- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- each comment does not need a key of `article_id`
- use the data from the `test-data` in your tests


### ESSENTIAL GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:
- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments


### ESSENTIAL GET `/api/articles/not-a-valid-id/comments`

Assertion: expected 404 to equal 400

Hints:
- return 400: Bad Request when given an invalid `article_id`


### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected null to equal 'butter_bridge'

Hints:
- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README


### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected 201 to equal 400

Hints:
- use a 400: Bad Request status code when `POST` request does not include all the required keys


### ESSENTIAL POST `/api/articles/10000/comments`

Assertion: expected 201 to be one of [ 404, 422 ]

Hints:
- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid article ID that does not exist


### ESSENTIAL POST `/api/articles/not-a-valid-id/comments`

Assertion: expected 201 to equal 400

Hints:
- use a 400: Bad Request when `POST` contains an invalid article_id


### ESSENTIAL POST `/api/articles/1/comments`

Assertion: expected 201 to be one of [ 404, 422 ]

Hints:
- use a 404: Not Found _OR_ 422: Unprocessable Entity status code when `POST` contains a valid username that does not exist


### ESSENTIAL GET `/api`

Assertion: expected 404 to equal 200

Hints:
- use a 200 status code


### FURTHER DELETE `/api/comments/1`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### FURTHER DELETE `/api/comments/1000`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### FURTHER DELETE `/api/comments/not-a-number`

Assertion: **ERROR WITH NO CATCH: CHECK YOUR CONTROLLERS!**



### FURTHER GET `/api/users`

Assertion: expected 404 to equal 200

Hints:
- use a 200 status code


### FURTHER GET `/api/users`

Assertion: expected {} to contain key 'users'

Hints:
- send users to the client in an object, with a key of users: `{ users: [] }`


### FURTHER GET `/api/users`

Assertion: Cannot read properties of undefined (reading '0')

Hints:
- send users to the client in an object, with a key of users: `{ users: [] }`
- use `username` for the column to store the username


### FURTHER GET `/api/users/butter_bridge`

Assertion: expected 404 to equal 200

Hints:
- use a 200 status code


### FURTHER GET `/api/users/butter_bridge`

Assertion: expected {} to contain key 'user'

Hints:
- send the user to the client in an object, with a key of `user`: `{ user: {} }`
- return the single user in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names


### FURTHER PATCH `/api/comments/1`

Assertion: expected 404 to equal 200

Hints:
- use a 200: OK status code for successful `patch` requests


### FURTHER PATCH `/api/comments/1`

Assertion: expected {} to contain key 'comment'

Hints:
- send the updated comment back to the client in an object, with a key of comment: `{ comment: {} }`


### FURTHER PATCH `/api/comments/1`

Assertion: Cannot read properties of undefined (reading 'votes')

Hints:
- increment the `votes` of the specified article


### FURTHER PATCH `/api/comments/1`

Assertion: Cannot read properties of undefined (reading 'votes')

Hints:
- decrement the `votes` of the specified article


### FURTHER PATCH `/api/comments/1`

Assertion: expected 404 to equal 400

Hints:
- use a 400: Bad Request status code when sent an invalid `inc_votes` value


### FURTHER PATCH `/api/comments/1`

Assertion: expected 404 to equal 200

Hints:
- use 200: OK status code when sent a body with no `inc_votes` property
- send an unchanged comment when no `inc_votes` is provided in the request body


### FURTHER PATCH `/api/comments/not-a-valid-id`

Assertion: expected 404 to equal 400

Hints:
- use a 400: Bad Request when `PATCH` contains an invalid comment_id


### FURTHER PATCH `/api/comments/1`

Assertion: expected 404 to equal 400

Hints:
- use a 400: Bad Request status code when sent an invalid `inc_votes` value


## Readme - Remove the one that was provided and write your own

- [ ] Link to hosted version
- [ ] Write a summary of what the project is
- [ ] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [ ] Include information about how to create `.env.test` and `.env.development` files
- [ ] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [ ] Remove any unnecessary `console.logs` and comments
- [ ] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [ ] .gitignore the `.env` files

## Connection to db

- [ ] Throw error if `process.env.PGDATABASE` is not set

## Creating tables

- [ ] Use `NOT NULL` on required fields
- [ ] Default `created_at` in articles and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`
- [ ] Delete all comments when the article they are related to is deleted: Add `ON DELETE CASCADE` to `article_id` column in `comments` table.

## Inserting data

- [ ] Drop tables and create tables in seed function

## Tests

- [ ] Seeding before each test
- [ ] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [ ] Ensure all tests are passing
- [ ] Cover all endpoints and errors

- `GET /api/topics`

  - [ ] Status 200, array of topic objects

- `GET /api/articles/:article_id`

  - [ ] Status 200, single article object (including `comment_count`)
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999

- `PATCH /api/articles/:article_id`

  - [ ] Status 200, updated single article object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

- `GET /api/articles`

  - [ ] Status 200, array of article objects (including `comment_count`, excluding `body`)
  - [ ] Status 200, default sort & order: `created_at`, `desc`
  - [ ] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [ ] Status 200, accepts `order` query, e.g. `?order=desc`
  - [ ] Status 200, accepts `topic` query, e.g. `?topic=coding`
  - [ ] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [ ] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [ ] Status 404. non-existent `topic` query, e.g. `?topic=bananas`
  - [ ] Status 200. valid `topic` query, but has no articles responds with an empty array of articles, e.g. `?topic=paper`

- `GET /api/articles/:article_id/comments`

  - [ ] Status 200, array of comment objects for the specified article
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/articles/:article_id/comments`

  - [ ] Status 201, created comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing required field(s), e.g. no username or body properties
  - [ ] Status 404, username does not exist
  - [ ] Status 201, ignores unnecessary properties

- `GET /api`

  - [ ] Status 200, JSON describing all the available endpoints

## Routing

- [ ] Split into api, topics, users, comments and articles routers
- [ ] Use `.route` for endpoints that share the same path

## Controllers

- [ ] Name functions and variables well
- [ ] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- Protected from SQL injection
  - [ ] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [ ] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [ ] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] Use `LEFT JOIN` for comment counts

## Errors

- [ ] Use error handling middleware functions in app and extracted to separate directory/file
- [ ] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `DELETE /api/comments/:comment_id`

- [ ] Status 204, deletes comment from database
- [ ] Status 404, non existant ID, e.g 999
- [ ] Status 400, invalid ID, e.g "not-an-id"

- `GET /api/users`

- [ ] Status 200, responds with array of user objects

- `GET /api/users/:username`

- [ ] Status 200, responds with single user object
- [ ] Status 404, non existant ID, e.g 999
- [ ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 400, missing / incorrect body, e.g. `inc_votes` property is not a number, or missing

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an article body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an article by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get articles created in last 10 minutes
- [ ] Get: Get all articles that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for topics
