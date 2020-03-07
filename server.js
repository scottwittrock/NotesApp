const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");
let id_num = 0;
var notes = db;
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
    res.json(notes);
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
    newNote.id = id_num++;
    console.log(newNote);
    notes.push(newNote);
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes), function (err) {
        if (err) throw err;
    })
    res.json(newNote);
});

//Deletes specific notes
app.delete("/api/notes/:id", function (req, res) {
    const chosenNote = req.params.id;
    console.log("this is chosenNote : " + chosenNote);
    for (let i = 0; i < notes.length; i++) {
        if (chosenNote === notes[i].id) {
            notes.splice(i, 1);
            console.log("this is notes: " + notes);
        }
    }
    fs.writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log(notes);
        return res.json(false);
    });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})


