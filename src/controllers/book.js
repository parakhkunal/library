import path from 'path';
const dbPath = path.resolve(__dirname, '../../db/library.db');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath);

function getBook(bookId) {
    let sql = `SELECT * FROM books WHERE book_id = ?`;
    db.get(sql, [bookId], (err, row) => {
        if (err) {
            return console.error(err.message);
          }
          return row
    });
}

export function createBook(req, res) {
    let sql = `INSERT INTO books values (?, ?, ?, ?, ?)`;
    db.run(sql, [null, req.body.author, req.body.title, 0, 0], err => {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.status(202);
        }
        res.end();
    });
}