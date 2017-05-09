'use babel';

const exec = require('child_process').exec;
const jschardet = require("jschardet");
const iconv = require("iconv-lite");

export default class AutocompleteRubyRctProvider {
  constructor() {
    this.selector = ".source.ruby";
  }
  getSuggestions({editor, bufferPosition, scopeDescriptor, prefix}) {
    return new Promise((resolve) => {
      var row = bufferPosition.row + 1;
      var col = bufferPosition.column;
      var proc = exec(`rct-complete --completion-class-info --dev --fork --line=${row} --column=${col}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`${error}`);
          return;
        }
        var data = stdout;
        var data_array = data.split("\n");
        var suggestions = [];
        for (let v of data_array) {
          var [text, rightLabel] = v.split("\t");
          var type = 'method';
          if (!rightLabel) {
            type = 'variable';
          }
          var suggestion = {
            text: text,
            rightLabel: rightLabel,
            type: type
          };
          suggestions.push(suggestion);
        }
        resolve(suggestions);
      });
      encoding = jschardet.detect(editor.getText());
      text = iconv.decode(editor.getText(), encoding.encoding);
      proc.stdin.write(text);
      proc.stdin.end();
    });
  }
}
