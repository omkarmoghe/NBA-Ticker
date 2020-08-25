import { fetchGames, Game, Score } from "./balldontlie-api";
import Manager from "./manger";

export function fetchScores(manager: Manager): Promise<Manager> {
  return fetchGames()
    .then((games) => buildScores(games))
    .then((newScores) => {
      manager.updateScores(newScores);
      return manager;
    });
}

// Builds a list of `Scores` from a list of `Games`.
function buildScores(games: Game[]): Score[] {
  return games.map((game) => new Score(game));
}

// Updates the ticker in the Status Bar.
export function updateTicker(manager: Manager): Manager {
  manager.rollTicker();
  return manager;
}
