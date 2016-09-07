var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    passport       = require('passport'),
    cookieParser   = require('cookie-parser'),
    session        = require('express-session'),
  	LocalStrategy  = require('passport-local').Strategy,
    bcrypt         = require('bcrypt'),
    api            = require('./routes/api.js'),
    auth           = require('./routes/auth.js'),
    User           = require('./models/user.js');

require('dotenv');

// --- Middleware --- //
app.use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(express.static('public'))
  .use('/bower_components', express.static(__dirname + '/bower_components'))
  .use(cookieParser())
  .use(session({
    secret:'test'
  }))



// --- Passport --- //
app.use(passport.initialize())
  .use(passport.session());
passport.use(new LocalStrategy((username, password, done) => {
  User
    .where('username', username)
    .fetch({withRelated: ['userGroup']})
    .then( user => {
      if (user) {
        user = user.toJSON();
      }
      if (user && bcrypt.compareSync(password, user.password)){
        return done(null, user);
      }

      return done(null, false);
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User
    .where('id', id)
    .fetch()
    .then( user => {
      user = user.toJSON();
      done(null, user);
    })
})

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
