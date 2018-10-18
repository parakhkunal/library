import uniqid from 'uniqid';
import path from 'path';
const dbPath = path.resolve(__dirname, '../../db/library.db');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath);

function getUser(userId) {
    let sql = `SELECT * FROM users WHERE user_id = ?`;
    db.get(sql, [userId], (err, row) => {
        if (err) {
            return console.error(err.message);
          }
          return row
    });
}

export function createUser(req, res) {
    let sql = `INSERT INTO users values (?, ?, ?, ?)`;
    db.run(sql, [null, uniqid(req.body.first_name), req.body.first_name, req.body.last_name], function(err) {
        if (err) {
            console.err(err);
            res.status(500);
        } else {
            res.json(getUser(this.lastID))
            res.status(202);
        }
        res.end();
    });
}