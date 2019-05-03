var db = require("../models");
var passport = require("passport");

module.exports = (app) => {
    app.get('/api/test', (req, res) => {
        res.json(true);
    })

    app.get("/getUser", function (req, res) {
        db.User.findAll({}).then(function(dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        })
    });

    //User routes
    //Sign in
    app.post('/signin', passport.authenticate('local-signin',
        {
            successRedirect: '/user',
            failureRedirect: '/signin'
        }
    ));

    app.post('/signup', passport.authenticate('local-signup', 
        {
            successRedirect: '/user',
            failureRedirect: '/signup'
        }
    ));
}