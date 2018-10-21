import { validationResult } from 'express-validator/check';

/**
 * Standard validation responder for invalid inputs
 * @param {*} req
 * @param {*} res
 */
export default function validateProcessableEntities(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
}
