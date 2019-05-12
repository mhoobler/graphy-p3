const db = require('../models');
const mongodb = require('../mongoModels');
const https = require('https');

module.exports = (app, passport) => {
    //TEST AREA
    app.get('/api/test', (req, res) => {
        res.json(true);
        // mongodb.Book.find({})
        // .then(result => res.json(result))
        // .catch(err => res.status(422).json(err))
    })

    app.get('/getUser', (req, res) => {
        if (req.isAuthenticated()) {
            db.User.findByPk(req.user.id).then(function(dbUser) {
              console.log(dbUser);
              res.json(dbUser);
            })
        } else {
            res.json(null);
        }
    });
    //TEST AREA

    // search for company name by stock symbol
    app.get('/api/tickers/:term', (req, res) => {
        db.Stock_master.findAll({ where: { symbol: req.params.term } })
        .then((dbStock) => {
            dbStock.user = "test";
            res.json(dbStock);
        });
    })
    //search for company name by search term
    app.get('/api/search/:term', (req, res) => {
        db.Stock_master.findAll({ where: { search_term: req.params.term } })
        .then((dbStock) => {
            res.json(dbStock);
        });
    });

    //api call for alphavantage
    app.get('/api/alpha/:term', (req, res) => {
        let data = '';
        
        https.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + req.params.term + '&apikey=' + process.env.stocksKey,
        (result) => {
            result.on('data', (stockData) => { 
                data += stockData;
            });
            result.on('end', () => {
                res.type('json');
                res.end(data);
            })
        })

    })

    //User routes
    app.post('/_api/signin', passport.authenticate('local-signin'),
        function(req, res){
            // console.log(req);
            // console.log(res.id);
            // req.user comes from passport
            if(req.user){
                let temp = {};
                // a secure way to filter your object properties
                // only expose what you need to expose
                temp.email = req.user.email;
                temp.id = req.user.id;
                res.json(temp);
            }
            else{
                res.json(false);
            }
        }
    );

    app.post('/_api/signup', passport.authenticate('local-signup'), 
    function(req, res){
        // console.log(req);
        // console.log(res);
        // req.user comes from passport
        if(req.user){
            let temp = {};
            // a secure way to filter your object properties
            // only expose what you need to expose
            temp.email = req.user.email;
            temp.id = req.user.id;
            res.json(temp);
        }
        else{
            res.json(false);
        }

    }
    );
}