// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext } from "vscode";
import { showScores } from "./commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log("NBA Ticker is active.");

	const showScoresSub = commands.registerCommand("nba-ticker.showScores", showScores);
	subscriptions.push(showScoresSub);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("NBA Ticker is deactivated.");
}
