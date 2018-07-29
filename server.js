const express = require('express');
const mongoose = require('mongoose');

const kural = express();

kural.use(express.static('src'));
kural.use(express.static('vendor'));

//Connecting to MongoDB
const { mongoURI } = require('./config/keys');
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then( () => console.log("MongoDB connected"))
    .catch( err => console.log(err));

//Defining the Routes
const loginRoute = require('./routes/login');
kural.use('/login', loginRoute);

const registerRoute = require('./routes/register');
kural.use('/register', registerRoute);

//Listen to port
const port = process.env.PORT || 5500;
kural.listen(port, () => {
    console.log(`Server started on port ${port}`);
});