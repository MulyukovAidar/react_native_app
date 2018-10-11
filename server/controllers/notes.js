var dateformat = require('dateformat');

var notes = []

exports.getNotes = function (req, resp, next) {

    resp.json({
        success: true,
        status: "Get all Notes succeeded",
        notes: notes

    });
    console.log(notes);
};

exports.createNote = function (req, resp, next) {

    var note = {
        "date": new Date(),
        "author": req.body.author,
        "message": req.body.message,
    }
    notes.push(note);
    resp.json({
        success: true,
        status: "Note creation successfull"

    });
};

exports.notes = notes;
