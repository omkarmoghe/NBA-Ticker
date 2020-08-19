import { StatusBarItem } from "vscode";
import { fetchGames, Game } from "./balldontlie-api";

export function update(ticker: StatusBarItem): void {
  fetchScores()
    .then((scores) => buildTickerString(scores))
    .then((tickerString) => updateTicker(ticker, tickerString));
}

// Fetches the latest scores from the "balldontlie" API.
function fetchScores(): Promise<string[]> {
  return fetchGames().then((games) => buildScorelines(games));
}

function buildScorelines(games: Game[]): string[] {
  return games.map(({ status, home_team, home_team_score, visitor_team, visitor_team_score }) => {
    return `[${status}] ${visitor_team.abbreviation} ${visitor_team_score} @ ${home_team_score} ${home_team.abbreviation}`;
  });
}

function buildTickerString(scorelines: string[]): string {
  return scorelines.join(" | ");
}

// Updates the ticker in the Status Bar.
function updateTicker(ticker: StatusBarItem, tickerString: string): void {
  console.log(tickerString);
  ticker.text = tickerString;
  ticker.show();
}
