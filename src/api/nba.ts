import axios from "axios";
// import * as moment from "moment";
import Game from "../models/Game";

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
      console.log(`GET ${URL} ${status} ${statusText}`);
      return data.scoreboard.games;
    })
    .catch((error) => {
      console.error(error);
    });
}
