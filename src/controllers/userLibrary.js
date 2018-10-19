import path from 'path';

const dbPath = path.resolve(__dirname, '../../db/library.db');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(dbPath);

function isBookIssued(bookId) {

}

function doesIdExist(Id) {
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    db.get(sql, [Id], (err, row) => {
        if (err) {
            console.log('nahi hai');
            return false;
        }
        if (row && row.length) {
            console.log('Case row was found!', row);
            // do something with your row variable
        } else {
            console.log('No case row was found :( !', row);
        }


        return true;
    });
}

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
export function addBookToUserLibrary(req, res) {
    console.log('user_id', req.body.user_id);
    console.log('doesIdExists(req.body.userId)', doesIdExist(req.body.user_id));
    // if (doesIdExists(req.body.userId)) {
    //     const sql = 'INSERT INTO books values (?, ?, ?, ?, ?, ?)';
    //     db.run(sql, [null, req.body.author, req.body.title, 0, 0, new Date().toUTCString()], (err) => {
    //         if (err) {
    //             res.status(err.status || 500).send({ Error: err.message });
    //         } else {
    //             res.status(202);
    //         }
    //         res.end();
    //     });
    // }
}

export function createUserwithPromise(req, res) {
}
