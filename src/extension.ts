import {
  commands,
  window,
  workspace,
  ExtensionContext,
  StatusBarItem,
  StatusBarAlignment
} from "vscode";
import { fetchScores, updateTicker } from "./commands";
import Manager from "./manger";

// Global instance of the status bar ticker.

export function activate({ subscriptions }: ExtensionContext) {
  console.info("NBA Ticker is active.");

  // Register commands.
  subscriptions.push(commands.registerCommand("nba-ticker.fetchScores", fetchScores));
  subscriptions.push(commands.registerCommand("nba-ticker.updateTicker", updateTicker));

  // Build ticker and manager.
  const ticker = buildTicker();
  subscriptions.push(ticker);
  const manager = new Manager(ticker);

  // Poll
  tickerPoll(manager);
  scorePoll(manager);
}

function buildTicker(): StatusBarItem {
  const alignment = config("side") === "left" ? StatusBarAlignment.Left : StatusBarAlignment.Right;
  const priority = config("priority");
  return window.createStatusBarItem(alignment, priority);
}

function tickerPoll(manager: Manager): void {
  commands.executeCommand("nba-ticker.updateTicker", manager).then(
    undefined,
    (e) => console.error(e.message)
  );
  setTimeout(
    () => tickerPoll(manager),
    config("tickerDelaySeconds") * 1000
  );
}

function scorePoll(manager: Manager): void {
  commands.executeCommand("nba-ticker.fetchScores", manager).then(
    undefined,
    (e) => console.error(e.message)
  );
  setTimeout(
    () => scorePoll(manager),
    config("pollDelaySeconds") * 1000
  );
}

export function config(setting: string) {
  return workspace.getConfiguration("nba-ticker")[setting];
}

export function deactivate() {
  console.info("NBA Ticker deactivated.");
}
