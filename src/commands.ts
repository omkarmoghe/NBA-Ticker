import { fetchGames, Game, Score } from "./balldontlie-api";
import { ticker, config } from "./extension";

// Global set of Scores
let scores: Score[];
let displayedScorePos: number;

export function fetchScores(): Promise<Score[]> {
  return fetchGames()
    .then((games) => buildScores(games))
    .then((newScores) => {
      scores = newScores;
      return newScores;
    });
}

// Builds a list of `Scores` from a list of `Games`.
function buildScores(games: Game[]): Score[] {
  return games.map((game) => new Score(game));
}

// Updates the ticker in the Status Bar.
export function updateTicker(): void {
  debugger;
  if (ticker && scores) {
    // Grab format and score to display.
    const formatString = config("format");
    displayedScorePos = displayedScorePos || 0;
    const score = scores[displayedScorePos];

    // Update text
    ticker.text = score.format(formatString)

    // Increment displayed score position.
    displayedScorePos++;
    if (displayedScorePos >= scores.length) {
      displayedScorePos = 0;
    }
  } else if (ticker) {
    ticker.text = "No games today."
  }
}
