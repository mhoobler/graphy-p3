const db = require('../models');
const passport = require('passport');
const https = require('https');

module.exports = (app) => {
    //TEST AREA
    app.get('/api/test', (req, res) => {
        res.json(true);
    })

    app.get('/getUser', function (req, res) {
        db.User.findAll({})
        .then(function(dbUser) {
            console.log(dbUser);
            res.json(dbUser);
        })
    });
    //TEST AREA

    // search for company name by stock symbol
    app.get('/api/tickers/:term', function (req, res) {
        db.Stock_master.findAll({ where: { symbol: req.params.term } })
        .then(function (dbStock) {
            res.json(dbStock);
        });
    })
    //search for company name by search term
    app.get('/api/search/:term', function (req, res) {
        db.Stock_master.findAll({ where: { search_term: req.params.term } })
        .then(function (dbStock) {
            res.json(dbStock);
        });
    });

    //api call for alphavantage
    app.get('/api/alpha/:term', function (req, res) {
        https.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + req.params.term + '&apikey=' + process.env.stocksKey,
        (result) => {
            let data = '';

            result.on('data', (chunk) => { 
                data += chunk;
            });

            result.on('end', () => {
                res.type('json');
                res.end(data);
            })
        })

    })

    //User routes
    app.post('/_api/signin', passport.authenticate('local-signin',
        {
            successRedirect: '/user',
            failureRedirect: '/signin'
        }
    ));

    app.post('/_api/signup', passport.authenticate('local-signup', 
        {
            successRedirect: '/user',
            failureRedirect: '/signup'
        }
    ));
}