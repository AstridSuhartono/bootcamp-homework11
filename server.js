// Dependencies
var express = require("express");
var path = require("path");

// Tells node that we are creating an "express" server
var app = express();

app.use(express.static(__dirname + '/public'));
// Sets an initial Port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Load data source which hold the notes information
var data = require("./db/db.json");

// Routing

// HTML GET Requests. Below code handles when users "visit" notes page.
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// API GET Requests. Below code handles when users "visit" notes page.
app.get("/api/notes", function (req, res) {
    res.json(data);
});

//API POST Requests. Below code handles when users "visit" notes page.
app.post("/api/notes", function (req, res) {
    data.push(req.body);
    res.json(data);
});


app.delete("/api/notes/:id", function (req, res) {
    const id = Number(req.params.id);
    const newNotes = data.filter((el) => el.id != id);
    if(newNotes){
        data = newNotes;
        res.json(data);
    }
});

// HTML GET Requests. Below code handles when users "visit" other pages not defined in the route handling.
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
