const cliDefinitions = require('./cli-definitions');
const cliFunctions = require('./cli-functions');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');

const usage = commandLineUsage(cliDefinitions.helpSections);
const options = commandLineArgs(cliDefinitions.optionDefinitions);

export function cli() {
  for (var property in options) {
    switch (property) {
      case 'help':
        console.log(usage);
        break;
      case 'remove':
        cliFunctions.remove(options.remove);
        break;
      case 'today':
        cliFunctions.today();
        break;
      case 'show':
        cliFunctions.show(options.show);
        break;
      case 'add':
        cliFunctions.add(options.add);
        break;
    }
  }

  // Check if no args were supplied
  if (Object.keys(options).length === 0 && options.constructor === Object) {
    cliFunctions.today();
  }
}
