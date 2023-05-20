import axios from "axios";
import Game from "../models/Game";
import { Uri } from "vscode";

// const API_VERSION: Readonly<string> = "v2";
// const BASE_URL: Readonly<string> = `https://data.nba.net/prod/${API_VERSION}`;
const URL: Readonly<string> = "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json";
const HEADERS = {
  "Content-Type": "application/json"
};
// const scoreboardUrl = (date: string) => `${BASE_URL}/${date}/scoreboard.json`;

// const today = () => moment().format("YYYYMMDD");

export function fetchGames(): Promise<Game[]> {
  // const url = scoreboardUrl(today());
  return axios.get(URL, { headers: HEADERS })
    .then(({ status, statusText, data }) => {
      console.debug(`GET ${URL} | ${status} ${statusText}`);
      return data.scoreboard.games;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function buildGameUri(game: Game): Uri {
  const uriString = `https://www.nba.com/game/${game.awayTeam.teamTricode}-vs-${game.homeTeam.teamTricode}-${game.gameId}`;
  return Uri.parse(uriString.toLowerCase());
}
