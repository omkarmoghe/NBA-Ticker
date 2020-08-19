// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, window, StatusBarItem, StatusBarAlignment } from "vscode";
import { update } from "./commands";

const TIMEOUT = 5 * 60 * 1000 // every minute

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate({ subscriptions }: ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log("NBA Ticker is active.");
	subscriptions.push(commands.registerCommand("nba-ticker.updateScores", update));

	const ticker = buildTicker();
	subscriptions.push(ticker);

	// Start polling for scores.
	scorePoll(ticker);
}

function buildTicker(): StatusBarItem {
	return window.createStatusBarItem(StatusBarAlignment.Right, 10);
}

function scorePoll(ticker: StatusBarItem, timeout: number = TIMEOUT): void {
	commands.executeCommand("nba-ticker.updateScores", ticker);
	setTimeout(scorePoll, timeout);
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("NBA Ticker is deactivated.");
}
