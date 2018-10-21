import path from 'path';
import app from './app';

const sqlite3 = require('sqlite3').verbose();

const dbPath = path.resolve(__dirname, '../db/library.db');

// open database from db file and define a global connection object
global.db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to SQlite database');
});

const { PORT = 3001 } = process.env;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// close database and serve connection on program exit
process.on('SIGINT', () => {
    console.log('\nClosing server and database connection');
    db.close(); // eslint-disable-line no-undef
    server.close();
});

module.exports = app; // for testing
