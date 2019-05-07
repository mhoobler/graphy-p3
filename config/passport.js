//load bcrypt
var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
    console.log("PASSPORT");

    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findByPk(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            // passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (email, password, done) {
            
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({ where: { email: email } }).then(function (user) {

                if (user) {
                    console.log("local-signup failed");
                    return done(null, false, { message: 'That email is already taken' });
                }

                else {
                    var userPassword = generateHash(password);
                    var data =
                    {
                        email: email,
                        password: userPassword,
                    };

                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            console.log("local-signup failed");
                            return done(null, false);
                        }
                        if (newUser) {
                            console.log("local-signup success");
                            return done(null, newUser);

                        }
                    });
                }
            });

        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            // passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (email, password, done) {
            var User = user;
            console.log("local-signin");
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }

            User.findOne({ where: { email: email } }).then(function (user) {
                if (!user) {
                    console.log("local-signin failed");
                    return done(null, false, { message: 'Email does not exist' });
                }
                if (!isValidPassword(user.password, password)) {
                    console.log("local-signin failed");
                    return done(null, false, { message: 'Incorrect password.' });
                }

                var userinfo = user.get();
                console.log("local-signin success");
                return done(null, userinfo);

            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong with your Signin' });
            });

        }

    ));
}

