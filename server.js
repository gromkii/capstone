var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    passport       = require('passport'),
    cookieParser   = require('cookie-parser'),
  	LocalStrategy  = require('passport-local').Strategy,
    bcrypt         = require('bcrypt'),
    api            = require('./routes/api.js'),
    auth           = require('./routes/auth.js'),
    User           = require('./models/user.js');

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

passport.use(new LocalStrategy((username, password, done) => {
  User
    .where('username', username)
    .fetch()
    .then( user => {
      user = user.toJSON();
      if (bcrypt.compareSync(password, user.password)){
        return(null, user);
      }
      return (null, false);
    });
}));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User()
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
