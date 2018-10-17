const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path')
const dbPath = path.resolve(__dirname, 'library.db')

//middleware
app.use(bodyParser.json());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  dynamicMeta: (req) => ({"body": req.body}),
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
}))

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(dbPath);

app.listen(3001);
