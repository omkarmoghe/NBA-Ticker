import {
  commands,
  window,
  workspace,
  ExtensionContext,
  StatusBarItem,
  StatusBarAlignment
} from "vscode";
import { fetchScores, updateTicker, openGame } from "./commands";
import Manager from "./models/Manager";

export function activate({ subscriptions }: ExtensionContext) {
  console.info("NBA Ticker is active.");

  // Register commands.
  subscriptions.push(commands.registerCommand("nba-ticker.fetchScores", fetchScores));
  subscriptions.push(commands.registerCommand("nba-ticker.updateTicker", updateTicker));
  subscriptions.push(commands.registerCommand("nba-ticker.openGame", openGame));

  // Build ticker and manager.
  const ticker = buildTicker();
  subscriptions.push(ticker);
  const manager = new Manager(ticker);

  // Poll
  tickerPoll(manager);
  scoreboardPoll(manager);
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

function scoreboardPoll(manager: Manager): void {
  commands.executeCommand("nba-ticker.fetchScores", manager).then(
    undefined,
    (e) => console.error(e.message)
  );
  setTimeout(
    () => scoreboardPoll(manager),
    config("pollDelaySeconds") * 1000
  );
}

export function config(setting: string) {
  return workspace.getConfiguration("nba-ticker")[setting];
}

export function deactivate() {
  console.info("NBA Ticker deactivated.");
}
