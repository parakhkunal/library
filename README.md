# library
A simple Node Library API with SQLite DB.

## Pre-requisites:
1.  Make sure you're runnnig Node on your machine. If not, download it from (https://nodejs.org/en/download/). This project is tested with Node V8.10.
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

2.  API Docs have been generated using http://apidocjs.com and can be used for reference. One can access the docs by opening `file:///[path_to_your_repo]/apidoc/index.html` from the repo in the browser.


## Database:

1.  SQlite DB is used for this project as a lightweight file based database. (https://www.sqlite.org/index.html)

2.  Relationship Diagram of the tables supporting the project -
    
    ![Library Model](https://raw.githubusercontent.com/parakhkunal/library/master/library_relationship_diagram.png)


## Unit Tests:

1.  Unit Tests have been written using Mocha(https://mochajs.org/) and Chai(https://www.chaijs.com/) and test coverage statistics are generated with istanbuljs/nyc(https://github.com/istanbuljs/nyc).

2.  To run the tests, go to the root folder via Terminal. Make sure that you're not serving the project locally. Run the following command - 

    ```sh
    $ npm run test
    ```
 
3.  The output should include the tests' statistics along with code coverage.
    
    ```
    31 passing (194ms)

    -------------------|----------|----------|----------|----------|-------------------|
    File               |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
    -------------------|----------|----------|----------|----------|-------------------|
    All files          |     88.3 |    85.92 |       95 |    88.24 |                   |
     src               |    85.23 |    88.89 |    91.67 |    85.06 |                   |
      app.js           |      100 |      100 |      100 |      100 |                   |
      routes.js        |    85.71 |    93.75 |      100 |    85.71 |... 71,304,308,362 |
      server.js        |    71.43 |       50 |    66.67 |    69.23 |       11,21,22,23 |
     src/controllers   |    90.36 |    80.49 |      100 |    90.36 |                   |
      book.js          |    85.71 |    66.67 |      100 |    85.71 |             13,29 |
      user.js          |    86.67 |    66.67 |      100 |    86.67 |             14,30 |
      userLibrary.js   |    92.59 |    86.21 |      100 |    92.59 |      30,54,76,110 |
     src/helpers       |    94.12 |      100 |     87.5 |    94.12 |                   |
      libraryHelper.js |    94.12 |      100 |     87.5 |    94.12 |                71 |
    -------------------|----------|----------|----------|----------|-------------------|

## Functionalities Supported:

1.  Create User
2.  Get User Details
3.  Create Book
4.  Get Book Details
5.  Add a book to user's library
6.  Mark a book from user's library as read or unread
7.  Delete a book from user's library
8.  Get all the books from user's library with filters like read, unread books and by authors


## Scope for Improvements:

1.  More scalable and robust database instead of file based DB
2.  Implement Repository Pattern for database interactions
3.  Adding database schema validations
4.  Git Hooks to run tests before pushing code to remote
