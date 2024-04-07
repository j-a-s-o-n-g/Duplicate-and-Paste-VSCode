const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand('duplicate-and-paste.DuplicateAndPaste', function () {
    const clipboardContent = vscode.env.clipboard.readText();

    clipboardContent.then((text) => {
      const lines = text.split(/\r?\n/);

      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const lineEnding = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';

        const currentPosition = editor.selection.active;
        const currentLine = editor.document.lineAt(currentPosition.line);
        const currentLineText = currentLine.text;
        const currentColumn = currentPosition.character;

        const lineRange = new vscode.Range(currentLine.range.start, currentLine.range.end);

        editor.edit((editBuilder) => {
          const newLines = lines.reduce((prev, curr) => {
            return (
              prev + currentLineText.slice(0, currentColumn) + curr + currentLineText.slice(currentColumn) + lineEnding
            );
          }, '');
          editBuilder.replace(lineRange, newLines);
        });
      }
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
