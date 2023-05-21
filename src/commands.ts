import { Uri, commands, window } from "vscode";
import Manager from "./models/Manager";
import { config } from "./extension";
import Game from "./models/Game";
import Score from "./models/Score";
import { fetchGames } from "./api/nba";
import { QuickPickItem } from "vscode";

export async function fetchScores(manager: Manager): Promise<Manager> {
  if (manager.allGamesFinal()) {
    return manager;
  }

  let games = await fetchGames();
  const teamFilter = config("teamFilter") || [];
  if (teamFilter.length > 0) {
    games = games.filter((game) => {
      return teamFilter.includes(game.awayTeam.teamTricode) || teamFilter.includes(game.homeTeam.teamTricode);
    });
  }

  const newScores = buildScores(games);
  manager.updateScores(newScores);

  return manager;
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

// Open a page for a game.
interface QuickPickGameItem extends QuickPickItem {
  uri: Uri;
}
export function openGame(): void {
  fetchGames()
    .then((games) => {
      const options: QuickPickGameItem[] = buildScores(games).map((score) => (
        {
          description: score.status,
          detail: score.details.join(". "),
          label: `${score.awayTeam} @ ${score.homeTeam}`,
          uri: score.uri,
        }
      ));
      window.showQuickPick(options, { canPickMany: false })
        .then((selectedGameItem) => {
          if (selectedGameItem) {
            return commands.executeCommand("vscode.open", selectedGameItem.uri);
          }
        });
    });
}
