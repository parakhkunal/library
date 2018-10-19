import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';

import { createUser } from './controllers/user';
import { createBook } from './controllers/book';
import { addBookToUserLibrary } from './controllers/userLibrary';

const routes = Router();

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
        res.status(500).send({ error: req });
    }
});

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
        res.status(500).send({ error: req });
    }
});

routes.post('/addToLibrary', [
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
        res.status(500).send({ error: req });
    }
});


export default routes;
