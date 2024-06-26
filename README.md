# Blog Website API

Basic endpoints for User and Blog CRUD, with authentication and ownership using JWT.  

## Getting Started

### Dependencies

This project uses npm packages which need to be installed using:
```
npm i
```
You will also need to configure .env file in the root directory:
```
cd backend-blog
touch .env
```
And specify the following constants:
PORT=(`int` for the port of the server)
MONGO_URI=(`string` the connection string for MongoDB)

### Installing

Ensure that Nodejs is installed on your machine using:
```
brew install node
```

### Executing program

To start a local server using nodemon enter:
```shell
cd <repo-dir>
npm run dev
```

### API Endpoints

There are 4 user-orientated use cases and 5 blog-orientated use cases.

##### User Routes

- `POST '/login' Public` | Allow user to login

- `POST '/register' Public` | Allow user to register

- `GET '/logout' Private` | Allow loggedIn user to logout

- `GET '/profile' Private` | Allow loggedIn user to get profile information

##### Blog Routes

- `GET 'blogs/' Public` | Allow user to see all blogs

- `POST 'blogs/' Private` | Allow loggedIn user to create a new blog

- `GET 'blogs/:id' Private` | Allow loggedIn user to see all info about a blog

- `DELETE 'blogs/:id' Private` | Allow loggedIn user to delete a blog

- `PATCH 'blogs/:id' Private` | Allow loggedIn user to update a blog


## Help

Contact the author for additional requirements and help. 

## Authors

Contributors names and contact info

ex. Jacob Brown  
ex. brownbro1634@gmail.com

## Version History

* 0.1
    * Initial Release

## License

This project is not licensed. 

## Acknowledgments