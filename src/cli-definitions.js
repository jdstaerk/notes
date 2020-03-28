module.exports.optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'remove', alias: 'r', type: Number, multiple: false },
  { name: 'today', alias: 't', type: Boolean },
  { name: 'show', alias: 's', type: Number },
  { name: 'add', alias: 'a', type: String, multiple: true }
];

module.exports.helpSections = [
  {
    header: 'Notes app',
    content: 'An easy, simple and fast note taking approach in your command line.'
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'add',
        alias: 'a',
        description: "Add a new note to today's notes.",
        multiple: true,
        type: String,
        typeLabel: '{underline "Note #1" "Note #2" "..."}'
      },
      {
        name: 'today',
        alias: 't',
        description: 'Display your notes for today.',
        type: Boolean
      },
      {
        name: 'remove',
        alias: 'r',
        description: 'Remove the entry of today specified by the number that you\'ll have to provide to this command.',
        type: Number,
        typeLabel: '{underline Number}'
      },
      {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Print this usage guide.'
      }
    ]
  }
];
