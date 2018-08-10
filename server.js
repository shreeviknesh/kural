const express = require('express');
const mongoose = require('mongoose');

const kural = express();

//Static Folders
kural.use(express.static('src'));
kural.use(express.static('vendor'));

//Templating Engine
const exphbs = require('express-handlebars').create({
	extname: '.hbs',
	defaultLayout: 'layout.hbs',
	partialsDir: 'views/partials',
	layoutsDir: 'views/layouts/'
});

kural.set('views', __dirname + '\\views');
kural.engine('hbs', exphbs.engine);
kural.set('view engine', 'hbs');

//Body Parser Middleware
const bodyParser = require('body-parser');
kural.use(bodyParser.json());
kural.use(bodyParser.urlencoded({extended: false}));

//Connecting to MongoDB
const { mongoURI } = require('./config/keys');
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then( () => console.log("MongoDB connected"))
    .catch( err => console.log(err));
const db = mongoose.connection;

//Defining the Routes
const indexRoute = require('./routes/index.js');
kural.use('/', indexRoute);

const loginRoute = require('./routes/login');
kural.use('/login', loginRoute);

const registerRoute = require('./routes/register');
kural.use('/register', registerRoute);

//Listen to port
const port = process.env.PORT || 5500;
kural.listen(port, () => {
    console.log(`Server started on port ${port}`);
});