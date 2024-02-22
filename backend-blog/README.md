# How to configure the Blog API

This project was created with Node.js, Express and MongoDB.

## Available Scripts

In the project directory, you can run:

### `npm install`

To install the required package dependancies.

### `npm run dev`

To start the server with nodemon.

### .ENV Configuration
You will need to create a `.env` file in the root directory with three variables:

To create the file enter: 

`cd backend-blog`
`touch .env`

You will need to include the following in the file:

PORT=(`int` for the port of the server)
MONGO_URI=(`string` the connection string for mongodb)
SECRET=(`string` a secret string for jwt tokens)

# How to use the Blog API

There are 4 user-orientated use cases and 5 blog-orientated use cases.

## User Routes

`POST '/login' Public` | Allow user to login

`POST '/register' Public` | Allow user to register

`GET '/logout' Private` | Allow loggedIn user to logout

`GET '/profile' Private` | Allow loggedIn user to get profile information

## Blog Routes

`GET 'blogs/' Public` | Allow user to see all blogs

`POST 'blogs/' Private` | Allow loggedIn user to create a new blog

`GET 'blogs/:id' Private` | Allow loggedIn user to see all info about a blog

`DELETE 'blogs/:id' Private` | Allow loggedIn user to delete a blog

`PATCH 'blogs/:id' Private` | Allow loggedIn user to update a blog
