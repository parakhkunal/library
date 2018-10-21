import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();

// Logger as a middleware for all the routes
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true,
            silent: process.env.NODE_ENV === 'test',
        }),
    ],
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    dynamicMeta: req => ({ body: req.body }),
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use /services as a prefix for all Routes
app.use('/services', routes);

export default app;
