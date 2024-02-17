// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { jumpTo } from "./jump";

const myStatusBarlist: Array<vscode.StatusBarItem> = []; // 用于保存新增的状态栏项

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vue-jump" is now active!');

  const tagArr = ["template", "script", "style"];
  tagArr.forEach((tag) => {
    const myCommandId = `vue-jump.${tag}`;
    subscriptions.push(
      vscode.commands.registerCommand(myCommandId, () => {
        jumpTo(tag);
      })
    );

    // create a new status bar item that we can now manage
    const myStatusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left
    );
    myStatusBarItem.command = myCommandId;
    myStatusBarItem.text = tag;
    myStatusBarItem.tooltip = `Jump to ${tag} tag`;
    myStatusBarlist.push(myStatusBarItem);
    subscriptions.push(myStatusBarItem);
  });
  updateStatusBarItem();
  subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(() => {
      updateStatusBarItem();
    })
  );
}

function updateStatusBarItem() {
  if (vscode.window.activeTextEditor?.document.languageId === "vue") {
    myStatusBarlist.forEach((item) => {
      item.show();
    });
  } else {
    myStatusBarlist.forEach((item) => {
      item.hide();
    });
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
