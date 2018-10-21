import groupBy from 'lodash.groupby';
import queries from '../../db/queries.json';

/**
 * Helper function to check whether record exists in the provided tables or not
 * @param {number} id - Lookup id for the table
 * @param {string} schema - Table name
 * @callback {*} callback
 */
export const doesEntryExist = (id, schema, callback) => {
    let isFound = false;
    const sql = schema === 'user' ? queries.user.checkUserExists : queries.book.checkBookExists;
    db.get(sql, [id], (err, row) => { // eslint-disable-line no-undef
        if (!err && row !== undefined) {
            isFound = true;
        }
        callback(isFound);
    });
}

/**
 * Helper function to check whether record exists in the library for the specified user and book id combination or not
 * @param {number} userId - Lookup user_id for the library table
 * @param {number} bookId - Lookup book_id for the library table
 * @callback {*} callback
 */
export const doesLibraryEntryExist = (userId, bookId, callback) => {
    let isFound = false;
    db.get(queries.library.checkUserLibraryExists, [userId, bookId], (err, row) => { // eslint-disable-line no-undef
        if (!err && row !== undefined) {
            isFound = true;
        }
        callback(isFound);
    });
}

/**
 * Helper function to group elements of array by key using groupBy
 * @param {array} response - Input array to be grouped
 * @param {*} key - groupping key
 */
export const groupResponseByKey = (response, key) => {
    return groupBy(response, key);
}

/**
 * Standard response formatter for errors
 * @param {*} res
 * @param {Object} err - Error object
 * @param {string} message - Message to be sent
 */
export const standardErrorResponse = (res, err, message) => {
    res.status(err.status || 500).send({ Error: message });
}

/**
 * Standard response formatter for custom errors
 * @param {*} res
 * @param {*} message - Message to be sent
 */
export const customErrorResponse = (res, message) => {
    res.status(404).send({ Error: message });
}

/**
 * Standard response formatter for exceptions
 * @param {*} res
 * @param {*} exception - Caught exception to be returned
 */
export const standardExceptionResponse = (res, exception) => {
    res.status(500).send({ Error: exception.message });
}
