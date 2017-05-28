var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3001';

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/board_dev.htm'));
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/build', express.static(path.join(__dirname, 'build')));
app.use('/css', express.static(path.join(__dirname, 'css')));

// import model
require('./models/Notes');

// initialize model
var Note = mongoose.model('Note');

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scrum-board');

/* GET all notes. */
app.get('/notes', function (req, res, next) {
    Note.find(function(err, notes) {
        if (err) {
            return next(err);
        }

        res.json(notes);
    });
});

/* POST a new note. */
app.post('/notes', function(req, res, next) {
    var note = new Note(req.body);

    note.save(function(err, note) {
        if (err) {
            return next(err);
        }

        res.json(note);
    });
});

http.createServer(app).listen(port, function () {
	console.log("Server ready at http://localhost:" + port);
});