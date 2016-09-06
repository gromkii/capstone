var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    cookieSession  = require('cookie-session'),
    passport       = require('passport'),
  	LocalStrategy  = require('passport-local').Strategy,
    api            = require('./routes/api.js'),
    auth           = require('./routes/auth.js');

// --- Middleware --- //
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(express.static('public'))
  .use('/bower_components', express.static(__dirname + '/bower_components'));


// --- Passport --- //
app.use(cookieSession({
	name: 'session',
	keys: [process.env.KEY1, process.env.KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password',
	session: false
}, (username, password, done) => {
	// Check id of user, retrieve row in users table.
	Users().where('username', username)
		.first()
		.then( user => {
			// compareSync the user's hashed password.
			if (user && bcrypt.compareSync(password, user.password)){
				// On match, return confirmation of session.
				return done(null, user);
			}
			// Otherwise, return no session, redirect.
			return done(null, false);
		})
}));

passport.serializeUser(function(user, done) {
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users()
		.where('id', id)
		.first()
		.then( user => {

			done(null, user);
	});
});

// --- Routing --- //
app.use('/api', api);
app.use('/auth', auth);

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/views/index.html')
});

// --- Server --- //
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening');
});

module.exports = app;
