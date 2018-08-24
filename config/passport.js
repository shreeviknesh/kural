const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.use(new LocalStrategy({
	usernameField: 'userid',
	passwordField: 'password'
	}, (userID, password, done) => {
		User.findUser(userID, (err, user) => {
			if(err) throw err;
			if(!user) {
				return done(null, false, {message: "User not found!"});
			}

			User.comparePassword(password, user.password, (err, isMatch) => {
				if(err) throw err;
				if(isMatch) {
					return done(null, user);
				} else {
					return done(null, false, {message: 'Invalid Password'})
				}
			});
		});
	}));

passport.serializeUser((user, done) => {
    done(null, user.userID);
});

passport.deserializeUser((userID, done) => {
    User.findUser(userID, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;