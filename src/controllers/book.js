import path from 'path';

const dbPath = path.resolve(__dirname, '../../db/library.db');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(dbPath);

function getUser(userId) {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    db.get(sql, [userId], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        return row;
    });
}

/**
 *
 * @param {*} req
 * @param {*} res
 */
export function createBook(req, res) {
    const sql = 'INSERT INTO books values (?, ?, ?, ?, ?, ?)';
    db.run(sql, [null, req.body.author, req.body.title, 0, 0, new Date().toUTCString()], (err) => {
        if (err) {
            res.status(err.status || 500).send({ Error: err.message });
        } else {
            res.status(202);
        }
        res.end();
    });
}

export function createUserwithPromise(req, res) {
}
