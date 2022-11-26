import axios from "axios";
import * as moment from "moment";
import Game from "../models/Game";

const API_VERSION: Readonly<string> = "v2";
const BASE_URL: Readonly<string> = `https://data.nba.net/prod/${API_VERSION}`;
const scoreboardUrl = (date: string) => `${BASE_URL}/${date}/scoreboard.json`;

const today = () => moment().format("YYYYMMDD");

export function fetchGames(): Promise<Game[]> {
  const url = scoreboardUrl(today());
  return axios.get(url)
    .then(({ status, statusText, data }) => {
      console.info(`GET ${url} ${status} ${statusText}`);
      return data.games;
    })
    .catch((error) => {
      console.error(error);
    });
}
