import { Router } from 'express';
import { validationResult, check } from 'express-validator/check';

import { createUser, getUser } from './controllers/user';
import { createBook, getBook } from './controllers/book';
import {
    updateBookReadStatus, deleteBookFromUserLibrary, addBookToUserLibrary, getUserBooks
} from './controllers/userLibrary';
import { standardExceptionResponse } from './helpers/libraryHelper';

const routes = Router();
routes.get('/', function (req, res) {
  res.send('Wiki home page');
});
/**
 * @api {post} /user Save user information
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam {String} first_name First name of the user.
 * @apiParam {String} last_name Last name of the user.
 *
 * @apiSuccess {Number} user_id Generated User ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_id": 123
 *     }
 *
 * @apiError Invalid Provided input didn't match the validation
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *          "errors": [
 *              {
 *                  "location": "body",
 *                  "param": "first_name",
 *                  "value": "Maria$$$",
 *                  "msg": "Invalid value"
 *              }
 *          ]
 *      }
 */
routes.post('/user', [
    check('first_name').trim().escape().isAlphanumeric(),
    check('last_name').trim().escape().isAlphanumeric(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        createUser(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

/**
 * @api {get} /user/:user_id Get user's information
 * @apiName getUser
 * @apiGroup User
 *
 * @apiParam {Number} user_id User ID of the user.
 *
 * @apiSuccess {Number} user_id Generated User ID
 * @apiSuccess {String} username Randomly generated unique username
 * @apiSuccess {String} first_name First name of the user.
 * @apiSuccess {String} last_name Last name of the user.
 * @apiSuccess {String} created_at Timestamp
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "result": {
 *              "user_id": 43,
 *              "username": "Random29l9b4eppjngz0743",
 *              "first_name": "Random",
 *              "last_name": "Name",
 *              "created_at": "Sat, 20 Oct 2018 04:56:06 GMT"
 *          }
 *      }
 *
 * @apiError UserNotFound User wasn't found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "Error": "No records found for the specified user."
 *     }
 */
routes.get('/user/:user_id', [
    check('user_id').trim().escape().isNumeric(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        getUser(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

/**
 * @api {post} /book Save book information
 * @apiName createBook
 * @apiGroup Book
 *
 * @apiParam {String} author Name of the author.
 * @apiParam {String} title Title of the book.
 *
 * @apiSuccess {Number} book_id Generated Book ID
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "book_id": 123
 *     }
 *
 * @apiError Invalid Provided input didn't match the validation
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *          "errors": [
 *              {
 *                  "location": "body",
 *                  "param": "author",
 *                  "value": "Maria$$$",
 *                  "msg": "Invalid value"
 *              }
 *          ]
 *      }
 */
routes.post('/book', [
    check('author').trim().escape().isString(),
    check('title').trim().escape().isString(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        createBook(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

/**
 * @api {get} /book/:book_id Get book's information
 * @apiName getBook
 * @apiGroup Book
 *
 * @apiParam {Number} book_id Book ID of the book.
 *
 * @apiSuccess {Number} book_id Generated Book ID
 * @apiSuccess {String} author Name of the author
 * @apiSuccess {String} title Title of the book
 * @apiSuccess {String} created_at Timestamp
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "result": {
 *              "book_id": 43,
 *              "author": "Test",
 *              "title": "Test",
 *              "created_at": "Sat, 20 Oct 2018 04:56:06 GMT"
 *          }
 *      }
 *
 * @apiError BookNotFound Book wasn't found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "Error": "No records found for the specified book."
 *     }
 */
routes.get('/book/:book_id', [
    check('book_id').trim().escape().isNumeric(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        getBook(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

/**
 * @api {post} /user/:user_id/book/:book_id Add a book to user's library
 * @apiName addBookToUserLibrary
 * @apiGroup Library
 *
 * @apiParam {Number} user_id User ID of the user that wants to add a book.
 * @apiParam {Number} book_id Book ID of the book that needs to be added to the user's collection.
 *
 * @apiSuccess {Number} user_library_id Generated ID for user's library entry
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user_library_id": 12
 *     }
 *
 * @apiError BookAlreadyIssued The book is already taken by a user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *          "Error": "The book is already issued to a user."
 *     }
 */
routes.post('/user/:user_id/book/:book_id', [
    check('user_id').trim().escape().isNumeric(),
    check('book_id').trim().escape().isNumeric(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        addBookToUserLibrary(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

/**
 * @api {put} /user/:user_id/book/:book_id/operation/:mark_as_read Mark a book as read or unread from user's library
 * @apiName updateBookReadStatus
 * @apiGroup Library
 *
 * @apiParam {Number} user_id User ID of the user who has issued the book
 * @apiParam {Number} book_id Book ID of the issued book
 * @apiParam {Boolean} mark_as_read 0 - Mark as Unread, 1 - Mark as Read
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Record successfully updated."
 *     }
 *
 * @apiError EntryNotFound The book entry for the user doesn't exist in the library
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "Error": "Library entry not found."
 *     }
 */
routes.put('/user/:user_id/book/:book_id/operation/:mark_as_read', [
    check('user_id').trim().escape().isNumeric(),
    check('book_id').trim().escape().isNumeric(),
    check('mark_as_read').trim().escape().isBoolean(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        updateBookReadStatus(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

/**
 * @api {delete} /user/:user_id/book/:book_id Delete a book from user's library
 * @apiName deleteBookFromUserLibrary
 * @apiGroup Library
 *
 * @apiParam {Number} user_id User ID of the user for which the book needs to be deleted.
 * @apiParam {Number} book_id Book ID of the book that needs to be deleted from the user's collection.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "message": "Record successfully deleted."
 *     }
 *
 * @apiError EntryNotFound The book entry for the user doesn't exist in the library
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "Error": "Library entry not found."
 *     }
 */
routes.delete('/user/:user_id/book/:book_id', [
    check('user_id').trim().escape().isNumeric(),
    check('book_id').trim().escape().isNumeric(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        deleteBookFromUserLibrary(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

/**
 * @api {get} /user/:user_id/books?filter=read Get user's books from the Library
 * @apiName getUserBooks
 * @apiGroup Library
 *
 * @apiParam {Number} user_id User ID of the user.
 * @apiParam {String} [filter] Optional queryparam returns user's library collection by books read, unread and by authors.
 *                             filter=read - Returns only read books,
 *                             filter=unread - Returns only unread books,
 *                             filter=author - Returns unique author books.
 *
 * @apiSuccess {Number} book_id Book ID of the book
 * @apiSuccess {String} author Author of the book
 * @apiSuccess {String} title Title of the book
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "books": [
 *              {
 *                  "book_id": 2,
 *                  "author": "J.K.Rowling",
 *                  "title": "Harry Potter"
 *              },
 *              {
 *                  "book_id": 12,
 *                  "author": "Dan Brown",
 *                  "title": "The Lost Symbol"
 *              }
 *          ]
 *     }
 *
 * @apiError NoRecordsFound User doesn't have any books in the library
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          "Error": "No Records found for the user in library."
 *     }
 */
routes.get('/user/:user_id/books', [
    check('user_id').trim().escape().isNumeric(),
], (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        getUserBooks(req, res);
    } catch (exception) {
        standardExceptionResponse(res, exception);
    }
});

export default routes;
