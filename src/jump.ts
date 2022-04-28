import * as vscode from "vscode";

function getLineNumber(doc: vscode.TextDocument, tag: string): number {
  let lineNumberTagMatch = -1;

  for (let lineNumber = 0; lineNumber < doc.lineCount; lineNumber++) {
    if (doc.lineAt(lineNumber).text.trim().startsWith(`<${tag}`)) {
      lineNumberTagMatch = lineNumber;
      break;
    }
  }
  return lineNumberTagMatch;
}

export function jumpTo(tag: string) {
  const editor = vscode.window.activeTextEditor as vscode.TextEditor;

  if (editor.document.languageId === "vue") {
    const lineNumber = getLineNumber(editor.document, tag);

    if (lineNumber >= 0) {
      // Set cursor position
      const tagPosition = new vscode.Position(lineNumber, 0);
      editor.selection = new vscode.Selection(tagPosition, tagPosition);

      // Set scroll position
      const range = new vscode.Range(tagPosition, tagPosition);
      editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
    }
  }
}
