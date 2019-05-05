const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

var passport = require("passport");
var session = require("express-session");

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    // Although this references the build folder... Use the public folder in client/public to publish images/css/any static file
  app.use(express.static("client/build"));
  // client/public is the actual folder to use for static files
}

// You really only need API routes and not any HTML routes if you are using REACTJS as the frontend
// ******************************API ROUTES INCLUDED HERE***************************** //
app.get("/_api/non-cached", (req, res) => {
    res.json({ random: Math.random() });
});
app.get("/api/cached", (req, res) => {
    res.json({ random: Math.random() });
});

require('./config/passport.js')(passport, db.User);

require('./routes/api-routes.js')(app, passport);

// Send every request to the React app
// Define any API routes before this runs
// will be broken in development...
app.get("*", function(req, res) {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  }
  else{
      // reminder
      res.json({"message": "Go to http://localhost:3000"});
  }
});

var syncOptions = { force: false };

// reset tables
//let syncOptions = { force: process.env.NODE_ENV === 'development' ? true : false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;