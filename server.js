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

//Default page if notes.html not found
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//Retrieves all notes stored in db.json
app.post("/api/notes", function (req, res) {
    return res.sendFile(path.join(__dirname, "db/db.json"));
});

//Creates new notes, adds to db.json, returns new note to client
app.get("/api/notes", function (req, res) {
    const newNote = req.body;
    console.log("This is newNote: " + newNote);
    db.push(newNote);
    console.log("=================");
    console.log("This is db after newnote pushed: " + db);
    res.json(newNote);


    return res.sendFile(path.join(__dirname, "db/db.json"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})


