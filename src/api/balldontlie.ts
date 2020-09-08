import axios from "axios";
import * as moment from "moment";
import Game from "../models/Game";

const API_VERSION: Readonly<string> = "v1";
const BASE_URL: Readonly<string> = `https://balldontlie.io/api/${API_VERSION}`;
const GAMES: Readonly<string> = `${BASE_URL}/games`;

const teamMap: Readonly<Record<string, number>> = {
  ATL: 1,
  BOS: 2,
  BKN: 3,
  CHA: 4,
  CHI: 5,
  CLE: 6,
  DAL: 7,
  DEN: 8,
  DET: 9,
  GSW: 10,
  HOU: 11,
  IND: 12,
  LAC: 13,
  LAL: 14,
  MEM: 15,
  MIA: 16,
  MIL: 17,
  MIN: 18,
  NOP: 19,
  NYK: 20,
  OKC: 21,
  ORL: 22,
  PHI: 23,
  PHX: 24,
  POR: 25,
  SAC: 26,
  SAS: 27,
  TOR: 28,
  UTA: 29,
  WAS: 30,
};

const today = () => moment().format("YYYY-MM-DD");

export function fetchGames(teams: string[] = []): Promise<Game[]> {
  const params: Record<string, string[] | number[]> = {
    dates: [today()]
  };

  if (teams.length) {
    params.team_ids = teams.map((teamAbbrev) => teamMap[teamAbbrev]);
  }

  return axios.get(GAMES, { params }).then(({ status, statusText, data }) => {
    console.info(`GET ${GAMES} ${status} ${statusText}`);
    return data.data;
  });
}
