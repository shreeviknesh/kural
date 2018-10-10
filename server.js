const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/passport.js');
const flash = require('connect-flash');

const kural = express();

//Importing the routes
const indexRoute = require('./routes/index');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const profileRoute = require('./routes/profile');
const postRoute = require('./routes/post');

//Static Folders
kural.use(express.static(__dirname + '/src'));
kural.use(express.static(__dirname + '/vendor'));

//Templating Engine
const exphbs = expressHandlebars.create({
	extname: '.hbs',
	defaultLayout: 'outerLayout.hbs',
	partialsDir: 'views/partials',
	layoutsDir: 'views/layouts/'
});

kural.set('views', __dirname + '\\views');
kural.engine('hbs', exphbs.engine);
kural.set('view engine', 'hbs');
//Body Parser Middleware
kural.use(bodyParser.json());
kural.use(bodyParser.urlencoded({extended: false}));

//Express Session (Cookie) Middleware
kural.use(session({
	secret: 'very secure secret',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

//Passport Initialization
kural.use(passport.initialize());
kural.use(passport.session());

//Connect Flash Middleware
kural.use(flash());
kural.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

//Connecting to MongoDB
const { mongoURI } = require('./config/keys');
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then( () => console.log("MongoDB connected"))
    .catch( err => console.log(err));

//Defining the Routes
kural.use('/', indexRoute, profileRoute, postRoute);
kural.use('/login', loginRoute);
kural.use('/register', registerRoute);

//Listen to port
const port = process.env.PORT || 80;
kural.listen(port, () => {
    console.log(`Server started on port ${port}`);
});