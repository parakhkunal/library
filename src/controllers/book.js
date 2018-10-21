import queries from '../../db/queries.json';
import messages from '../helpers/messages.json';
import { standardErrorResponse, customErrorResponse } from '../helpers/libraryHelper';

/**
 * Add a book our collection
 * @param {*} req
 * @param {*} res
 */
export const createBook = (req, res) => {
    db.run(queries.book.create, [null, req.body.author, req.body.title, new Date().toUTCString()], function(err) { // eslint-disable-line no-undef
        if (err) {
            standardErrorResponse(res, err, err.message);
        } else {
            res.status(200).send({ book_id: this.lastID });
        }
        res.end();
    });
}

/**
 * Get a book from the collection of books
 * @param {*} req
 * @param {*} res
 */
export const getBook = (req, res) => {
    db.get(queries.book.get, [req.params.book_id], (err, book) => { // eslint-disable-line no-undef
        if (err) {
            standardErrorResponse(res, err, err.message);
        } else if (book !== undefined) {
            res.status(200).send({ book });
        } else {
            customErrorResponse(res, messages.failure.BOOK_NOT_FOUND);
        }
    });
}
