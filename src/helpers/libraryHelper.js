import queries from '../../db/queries.json';

/**
 * Helper function to check whether record exists in the provided tables or not
 * @param {number} id - Lookup id for the table
 * @param {string} schema - Table name
 * @callback {*} callback
 */
export function doesEntryExist(id, schema, callback) {
    let isFound = false;
    let sql = '';
    switch (schema) {
        case 'user':
            sql = queries.user.checkUserExists;
            break;
        case 'book':
            sql = queries.book.checkBookExists;
            break;
        default:
            sql = queries.library.checkUserLibraryExists;
    }
    db.get(sql, [id], (err, row) => { // eslint-disable-line no-undef
        if (!err && row !== undefined) {
            isFound = true;
        }
        callback(isFound);
    });
}

/**
 * Standard response formatter for errors
 * @param {*} req
 * @param {Object} err - Error object
 * @param {string} message - Message to be sent
 */
export function standardErrorResponse(res, err, message) {
    res.status(err.status || 500).send({ Error: message });
}

/**
 * Standard response formatter for custom errors
 * @param {*} res
 * @param {*} message - Message to be sent
 */
export function customErrorResponse(res, message) {
    res.status(404).send({ Error: message });
}

/**
 * Standard response formatter for exceptions
 * @param {*} res
 * @param {*} exception - Caught exception to be returned
 */
export function standardExceptionResponse(res, exception) {
    res.status(500).send({ Error: exception.message });
}
