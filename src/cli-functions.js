const os = require('os');
const path = require('path');
const fs = require('fs');
import { format } from 'date-fns';
const chalk = require('chalk');

const NOTES_FILE = path.join(os.homedir(), 'notes.json');
const TODAY = format(new Date(), 'yyyy-MM-dd (MMMM, EEEE)');

module.exports = {
  today: function() {
    var notesJSON = readNotesFile();

    console.log(chalk.bold(TODAY));
    if (notesJSON && notesJSON.length > 0 && notesJSON[notesJSON.length - 1].date == TODAY) {
      notesJSON[notesJSON.length - 1].notes.forEach(note => {
        console.log('  > ' + note);
      });
    } else {
      console.log(chalk.gray('  > Seems to be empty...'));
    }
    console.log();
  },
  add: function(notes) {
    if (!notes) return false;

    var notesJSON = readNotesFile();

    var jsonNotesToSave = [];
    for (let noteIdx in notes) {
      if (!notes[noteIdx]) continue;
      jsonNotesToSave.push(notes[noteIdx]);
    }

    if (notesJSON && notesJSON.length > 0 && notesJSON[notesJSON.length - 1].date == TODAY) {
      // There are existing notes for today
      if (!notesJSON[notesJSON.length - 1].notes) {
        notesJSON[notesJSON.length - 1] = [];
      }

      notesJSON[notesJSON.length - 1].notes = notesJSON[notesJSON.length - 1].notes.concat(jsonNotesToSave);
    } else {
      notesJSON.push({
        date: TODAY,
        notes: jsonNotesToSave
      });
    }

    writeNotesFile(notesJSON);
  },
  remove: function(noteIndex) {
    if (!noteIndex || noteIndex <= 0) return;

    var notesJSON = readNotesFile();

    if (notesJSON && notesJSON.length > 0 && notesJSON[notesJSON.length - 1].date == TODAY) {
      // noteIndex is not zero based. If noteIndex = 1, then remove the first item, not the second.
      notesJSON[notesJSON.length - 1].notes.splice(noteIndex - 1, 1);
      writeNotesFile(notesJSON);
    }
  },
  show: function(count = 3) {
    // This function shows the latest <count> notes
    if (count <= 0) count = 1;

    var notesJSON = readNotesFile();

    if (notesJSON.length < count) count = notesJSON.length;
    --count;
    for (var i = notesJSON.length - 1 - count; i <= notesJSON.length - 1; i++) {
      console.log(chalk.bold(notesJSON[i].date));
      notesJSON[i].notes.forEach(note => {
        console.log('  > ' + note);
      });
      console.log();
    }
  }
};

function readNotesFile() {
  let jsonNotes = [];
  try {
    let rawJSONNotes = fs.readFileSync(NOTES_FILE);
    if (rawJSONNotes) jsonNotes = JSON.parse(rawJSONNotes);
  } catch (error) {
    //console.error(error);
  }
  return jsonNotes;
}

function writeNotesFile(notesJSON) {
  if (!notesJSON) return false;

  try {
    let json = JSON.stringify(notesJSON);
    fs.writeFileSync(NOTES_FILE, json);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
