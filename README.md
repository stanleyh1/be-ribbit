# Ribbit

Welcome to Ribbit, an api for interacting with a reddit-style news site.

Access to the hosted version: https://nc-news-hannah.herokuapp.com/


Ribbit's api has the following endpoints:

/api:
* GET a list of all available endpoints


/api/articles:

* GET a list of all posted articles, which can be sorted by various properties
* POST a new article


/api/articles/:article_id:

* GET individual article information
* PATCH in order to vote up or down for an article
* DELETE an article


/api/articles/:article_id/comments:

* GET a list of comments, which can be sorted by various properties
* POST a new comment to an individual article


/api/comments/:comment_id:

* PATCH in order to vote up or down for a particular comment
* DELETE a comment


/api/topics:

* GET a list of topics


/api/users:

* GET a list of all users


Ribbit is made with:

* postgreSQL
* node.js 
* express

For testing:

* jest
* supertest

#### Installation:

First, make sure that you have node and postgreSQL installed on your system. If you are using ubuntu, postgreSQL should be installed by default.


Next, clone the repo to your hard drive 


You'll then need to install the various dependencies: 
```npm i -D```

Test suite

Jest and Supertest: 
```npm test```


#### Starting up the server:

Everything should now be ready for you to start up your server. Just type:

```npm start```

If all goes well, you should get the message

listening on port 9090...

now you can start making requests!