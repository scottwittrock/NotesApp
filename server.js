const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = [];

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

//Displays all notes
app.get("/api/notes", function (req, res) {
    return res.json(notes);
});

// Displays a single note, or returns false
app.get("/api/notes/:note", function (req, res) {
    const chosen = req.params.note;

    console.log(chosen);

    for (const i = 0; i < notes.length; i++) {
        if (chosen === notes[i].routeName) {
            return res.json(notes[i]);
        }
    }

    return res.json(false);
});

// Create New Notes - takes in JSON input

app.post("/api/notes", function (req, res) {
    const newNote = req.body;

    console.log(newNote);

    notes.push(newNote);

    res.json(newNote);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
