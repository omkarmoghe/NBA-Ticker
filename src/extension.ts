import {
	commands,
	window,
	workspace,
	ExtensionContext,
	StatusBarItem,
	StatusBarAlignment
} from "vscode";
import { update } from "./commands";

export function activate({ subscriptions }: ExtensionContext) {
	console.log("NBA Ticker is active.");
	subscriptions.push(commands.registerCommand("nba-ticker.updateScores", update));

	const ticker = buildTicker();
	subscriptions.push(ticker);

	// Start polling for scores.
	scorePoll(ticker);
}

function buildTicker(): StatusBarItem {
	const allignment = config("side") === "left" ? StatusBarAlignment.Left : StatusBarAlignment.Right;
	const priority = config("priority");
	return window.createStatusBarItem(allignment, priority);
}

function scorePoll(ticker: StatusBarItem): void {
	commands.executeCommand("nba-ticker.updateScores", ticker);
	setTimeout(scorePoll, config("pollDelaySeconds"));
}

function config(setting: string) {
	return workspace.getConfiguration(`nba-ticker.${setting}`);
}

export function deactivate() {
	console.log("NBA Ticker is deactivated.");
}
