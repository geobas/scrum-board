var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: false
    },
    // column: String,
    pageX: Number,
    pageY: Number
});

mongoose.model('Note', NoteSchema);