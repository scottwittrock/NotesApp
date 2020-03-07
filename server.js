const express = require("express");
const path = require("path");
const fs = require("fs");
let db = require("./db/db.json");
// console.log(db);
let notes = db;
console.log(notes);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// Routes
// =============================================================

//REturns notes.html
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


//Display all notes
app.get("/api/notes", function (req, res) {
    res.json(notes);;
});

//Retrieves and stores? all notes stored in db.json
app.get("/api/notes", function (req, res) {
    return res.sendFile(path.join(__dirname, "db/db.json"));
});

//Default page if notes.html not found
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


//Creates new notes, adds to db.json, returns new note to client
app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    console.log("This is newNote: " + newNote);
    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.name;
    console.log(newNote);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes), function (err) {
        if (err) throw err;
    })
    res.json(newNote);
});
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})


