import {
  commands,
  window,
  workspace,
  ExtensionContext,
  StatusBarItem,
  StatusBarAlignment
} from "vscode";
import { fetchScores, updateTicker } from "./commands";

// Global instance of the status bar ticker.
export let ticker: StatusBarItem;

export function activate({ subscriptions }: ExtensionContext) {
  console.info("NBA Ticker is active.");

  // Register commands.
  subscriptions.push(commands.registerCommand("nba-ticker.fetchScores", fetchScores));
  subscriptions.push(commands.registerCommand("nba-ticker.updateTicker", updateTicker));

  // Build and update the ticker.
  ticker = buildTicker();
  debugger;
  subscriptions.push(ticker);
  tickerPoll();

  // Poll for scores.
  scorePoll();
}

function buildTicker(): StatusBarItem {
  const alignment = config("side") === "left" ? StatusBarAlignment.Left : StatusBarAlignment.Right;
  const priority = config("priority");
  return window.createStatusBarItem(alignment, priority);
}

function tickerPoll(): void {
  commands.executeCommand("nba-ticker.updateTicker");
  setTimeout(
    () => tickerPoll(),
    config("tickerDelaySeconds") * 1000
  );
}

function scorePoll(): void {
  commands.executeCommand("nba-ticker.fetchScores");
  setTimeout(
    () => scorePoll(),
    config("pollDelaySeconds") * 1000
  );
}

export function config(setting: string) {
  return workspace.getConfiguration("nba-ticker")[setting];
}

export function deactivate() {
  console.info("NBA Ticker deactivated.");
}
