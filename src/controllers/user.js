import uniqid from 'uniqid';
import queries from '../../db/queries.json';
import messages from '../helpers/messages.json';
import { standardErrorResponse, customErrorResponse } from '../helpers/libraryHelper';

/**
 * Create a user in the database with unique username
 * @param {*} req input request object
 * @param {*} res
 */
export const createUser = (req, res) => {
    db.run(queries.user.create, [null, uniqid(), req.body.first_name, req.body.last_name, new Date().toUTCString()], function(err) { // eslint-disable-line no-undef
        if (err) {
            standardErrorResponse(res, err, err.message);
        } else {
            res.status(200).send({ user_id: this.lastID });
        }
        res.end();
    });
}

/**
 * Get a user from database
 * @param {*} req input request object
 * @param {*} res
 */
export const getUser = (req, res) => {
    db.get(queries.user.get, [req.params.user_id], (err, user) => { // eslint-disable-line no-undef
        if (err) {
            standardErrorResponse(res, err, err.message);
        } else if (user !== undefined) {
            res.status(200).send({ user });
        } else {
            customErrorResponse(res, messages.failure.USER_NOT_FOUND);
        }
    });
}
