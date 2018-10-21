# library
A simple Node Library API with SQLite DB.

## Pre-requisites:
1.  Make sure you're runnnig Node on your machine. If not, download it from (https://nodejs.org/en/download/)
2.  Also download Postman API client (https://www.getpostman.com/) to test the APIs. (Any other client would work too). Preferably postman because the API collection JSON is provided in this repo.

## Getting started:

1.  Clone this repo

    ```sh
    $ git clone https://github.com/parakhkunal/library.git
    ```

2.  Once inside the cloned repo locally, install dependencies

    ```sh
    $ npm install
    ```

## Building and serving the project locally:

1.  After installing dependencies, build the project.

    ```sh
    $ npm run build
    ```

2.  Serve the project. This should start the node server and SQlite DB as well. The server serves on http://localhost:3001

    ```sh
    $ npm run serve
    ```

## API Collection and Docs:

1.  A complete API collection is provided in `Library.postman_collection.json` file. Please import the collection in Postman.

2.  API Docs have been generated using http://apidocjs.com and can be used for reference. One can access the docs by opening `apidoc/index.html` from the repo in the browser.


## Database:

1.  SQlite DB is used for this project as a lightweight file based database. (https://www.sqlite.org/index.html)

2.  Relationship Diagram of the tables supporting the project -
    
        ![alt text](https://github.com/parakhkunal/library/blob/master/library_relationship_diagram.png)
      

## Functionalities Supported:

1.  Create User
2.  Get User Details
3.  Create Book
4.  Get Book Details
5.  Add a book to user's library
6.  Mark a book from user's library as read or unread
7.  Delete a book from user's library
8.  Get all the books from user's library with filters like read, unread books and by authors

