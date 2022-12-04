import Manager from "./models/Manager";
import { config } from "./extension";
import Game from "./models/Game";
import Score from "./models/Score";
import { fetchGames } from "./api/nba";

export function fetchScores(manager: Manager): Promise<Manager> {
  const teamFilter = config("teamFilter") || [];
  return fetchGames()
    .then((games) => {
      if (teamFilter.length > 0) {
        games = games.filter((game) => {
          return teamFilter.includes(game.awayTeam.teamTricode) || teamFilter.includes(game.homeTeam.teamTricode);
        });
      }

      return buildScores(games);
    })
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
