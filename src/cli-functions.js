const os = require('os');
const path = require('path');
const fs = require('fs');
import { format } from 'date-fns';
const chalk = require('chalk');

const NOTES_FILE = path.join(os.homedir(), 'notes.json');
const TODAY = format(new Date(), 'yyyy-MM-dd (MMMM, EEEE)');

module.exports = {
  today: function() {
    console.log('aeeeekjaöskdfj')
    var notesJSON = readNotesFile();

    if (notesJSON && notesJSON.length > 0 && notesJSON[notesJSON.length - 1].date == TODAY) {
      console.log(chalk.bold.black.bgGreen(' ' + TODAY + ' '));
      notesJSON[notesJSON.length - 1].notes.forEach(note => {
        console.log('  \u2937 ' + note);
      });
    }
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
  }
}

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
