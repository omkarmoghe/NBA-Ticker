import { fetchGames } from "./api/balldontlie";
import Manager from "./models/Manger";
import { config } from "./extension";
import Game from "./models/Game";
import Score from "./models/Score";

export function fetchScores(manager: Manager): Promise<Manager> {
  const teamFilter = config("teamFilter") || [];
  return fetchGames(teamFilter)
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
