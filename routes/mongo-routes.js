const mongodb = require('../mongoModels');
const db = require('../models');

module.exports = (app) => {
    app.post('/api/pin', (req, res) => {
        mongodb.SavedCharts.create(req.body)
        .then(result => {
            // console.log(result._id);
            let obj = {
                user_id: result.user_id,
                mongo_id: String(result._id),
                symbol: result.symbol
            }
            
            db.MongoKeys.create(obj)
            .then(result2 => {
                console.log(result2);
                res.json(result);
            })
            .catch(err => console.log(err));

        }).catch( err => res.status(422).json(err));
    }),

    app.get('/api/pin/:symbol', (req, res) => {
        console.log("/api/pin/:symbol Line26");
        let symbol = req.params.symbol;
        let data = [];

        //chane this back for passport to work "req.user.id" @ 2
        // if(req.isAuthenticated()){
            console.log("/api/pin/:symbol Line31")
            mongodb.SavedCharts.find({
                user_id: 2,
                symbol: symbol
            })
            .then(result => {
                console.log(result);
                res.json(result);
            })
            .catch(err => console.log(err));
        // }
    })
}