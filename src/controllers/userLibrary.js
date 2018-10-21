import queries from '../../db/queries.json';
import messages from '../helpers/messages.json';
import {
    doesEntryExist, doesLibraryEntryExist, standardErrorResponse, customErrorResponse, groupResponseByKey
} from '../helpers/libraryHelper';

/**
 * Add a book to the user's library
 * @param {*} req
 * @param {*} res
 */
export const addBookToUserLibrary = (req, res) => {
    let isUserFound,
        isBookFound = false;
    doesEntryExist(req.params.user_id, 'user', (data) => {
        isUserFound = data;
    });

    doesEntryExist(req.params.book_id, 'book', (data) => {
        isBookFound = data;
        if (isUserFound && isBookFound) {
            db.run(queries.library.addBookToUserLibrary, [null, req.params.user_id, req.params.book_id, 0, new Date().toUTCString()], function(err) { // eslint-disable-line no-undef
                if (err) {
                    let errorMessage = '';
                    switch (err.errno) {
                        case 19:
                            errorMessage = messages.failure.BOOK_ALREADY_ISSUED;
                            break;
                        default:
                            errorMessage = err.message;
                    }
                    standardErrorResponse(res, err, errorMessage);
                } else {
                    res.status(200).send({ user_library_id: this.lastID });
                }
                res.end();
            });
        } else {
            customErrorResponse(res, messages.failure.USER_OR_BOOK_NOT_FOUND);
        }
    });
}

/**
 * Mark a book in user's library as read or unread
 * @param {*} req
 * @param {*} res
 */
export const updateBookReadStatus = (req, res) => {
    doesLibraryEntryExist(req.params.user_id, req.params.book_id, (data) => {
        if (data) {
            db.run(queries.library.updateBookReadStatus, [req.params.mark_as_read, req.params.user_id, req.params.book_id], (err) => { // eslint-disable-line no-undef
                if (err) {
                    standardErrorResponse(res, err, err.message);
                } else {
                    res.status(200).send({ message: messages.success.RECORD_UPDATED });
                }
                res.end();
            });
        } else {
            customErrorResponse(res, messages.failure.LIBRARY_ENTRY_NOT_FOUND);
        }
    });
}

/**
 * Delete a book from user's library. Use a combination of user id and book id for a safe delete instead of deleting by primary key
 * @param {*} req
 * @param {*} res
 */
export const deleteBookFromUserLibrary = (req, res) => {
    doesLibraryEntryExist(req.params.user_id, req.params.book_id, (data) => {
        if (data) {
            db.run(queries.library.deleteBookFromUserLibrary, [req.params.user_id, req.params.book_id], (err) => { // eslint-disable-line no-undef
                if (err) {
                    standardErrorResponse(res, err, err.message);
                } else {
                    res.status(200).send({ message: messages.success.RECORD_DELETED });
                }
                res.end();
            });
        } else {
            customErrorResponse(res, messages.failure.LIBRARY_ENTRY_NOT_FOUND);
        }
    });
}

/**
 * Get user's books from the library. One can filter by read, unread books and group by authors
 * @param {*} req
 * @param {*} res
 */
export const getUserBooks = (req, res) => {
    const filter = req.query.filter || '';
    let sql = queries.library.getAllUserBooks;
    if (filter.length) {
        switch (filter) {
            case 'read':
                sql = queries.library.getUserReadBooks;
                break;
            case 'unread':
                sql = queries.library.getUserUnreadBooks;
                break;
            default:
                sql = queries.library.getAllUserBooks;
        }
    }
    db.all(sql, [req.params.user_id], (err, books) => { // eslint-disable-line no-undef
        if (err) {
            standardErrorResponse(res, err, err.message);
        } else if (books.length) {
            if (filter === 'author') {
                books = groupResponseByKey(books, 'author');
            }
            res.status(200).send({ books });
        } else {
            customErrorResponse(res, messages.failure.NO_RECORDS_FOUND);
        }
    });
}
