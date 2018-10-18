import {check, validationResult} from 'express-validator/check';

export default app => {
  const user = require('./controllers/user');
  const book = require('./controllers/book');

  app.route('/user')
  	.post(user.createUser);

  app.route('/book')
  	.post(book.createBook);


  app.route('/test', [
	  // username must be an email
	  check('first_name').isLength({ min: 5 }),
	  // password must be at least 5 chars long
	  check('last_name').isLength({ min: 5 })
	], (req, res) => {
	  // Finds the validation errors in this request and wraps them in an object with handy functions
	  const errors = validationResult(req);
	  if (!errors.isEmpty()) {
	    return res.status(422).json({ errors: errors.array() });
	  }

	  // User.create({
	  //   username: req.body.username,
	  //   password: req.body.password
	  // }).then(user => res.json(user));
	}).post(user.createUser);


  app.post('/test1', [
	  // username must be an email
	  check('username').isEmail(),
	  // password must be at least 5 chars long
	  check('password').isLength({ min: 5 })
	], (req, res) => {
	  // Finds the validation errors in this request and wraps them in an object with handy functions
	  const errors = validationResult(req);
	  if (!errors.isEmpty()) {
	    return res.status(422).json({ errors: errors.array() });
	  }

	  // User.create({
	  //   username: req.body.username,
	  //   password: req.body.password
	  // }).then(user => res.json(user));
	});
};