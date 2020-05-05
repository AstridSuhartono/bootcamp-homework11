// Dependencies
var express = require("express");
var fs = require("fs");
var path = require("path");

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial Port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routing

// HTML GET Requests. Below code handles when users "visit" a page.
// In each of the below cases the user is shown an HTML page of content
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// API routes Requests. 

// Below code handles when users "visit" a page.
app.get("/api/notes", function (req, res) {
    return res.json(path.join(__dirname, "/db/db.json"));
});




// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
