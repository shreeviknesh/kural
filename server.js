const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const kural = express();

//Importing the routes
const indexRoute = require('./routes/index.js');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');

//Static Folders
kural.use(express.static('src'));
kural.use(express.static('vendor'));

//Templating Engine
const exphbs = expressHandlebars.create({
	extname: '.hbs',
	defaultLayout: 'layout.hbs',
	partialsDir: 'views/partials',
	layoutsDir: 'views/layouts/'
});

kural.set('views', __dirname + '\\views');
kural.engine('hbs', exphbs.engine);
kural.set('view engine', 'hbs');

//Body Parser Middleware
kural.use(bodyParser.json());
kural.use(bodyParser.urlencoded({extended: false}));

//Connecting to MongoDB
const { mongoURI } = require('./config/keys');
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then( () => console.log("MongoDB connected"))
    .catch( err => console.log(err));

//Defining the Routes
kural.use('/', indexRoute);
kural.use('/login', loginRoute);
kural.use('/register', registerRoute);

//Listen to port
const port = process.env.PORT || 5500;
kural.listen(port, () => {
    console.log(`Server started on port ${port}`);
});