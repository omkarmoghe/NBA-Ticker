import axios from "axios";
import * as moment from "moment";

const API_VERSION = "v1";
const BASE_URL = `https://balldontlie.io/api/${API_VERSION}`;
const GAMES = `${BASE_URL}/games`;

interface Team {
  abbreviation: string,
  city: string,
  conference: string,
  division: string,
  full_name: string,
  id: number,
  name: string,
}

export interface Game {
  id: number,
  perdiod: number,
  date: string,
  season: number,
  postseason: boolean,
  status: string,
  time: string,
  home_team: Team,
  home_team_score: number,
  visitor_team: Team,
  visitor_team_score: number,
}

const today = () => moment().format("YYYY-MM-18");

export function fetchGames(dates: string[] = [today()], teams: number[] | null = null): Promise<Game[]> {
  const params = { dates, teams };

  return axios.get(GAMES, { params }).then(({ status, statusText, data }) => {
    console.log(`GET ${GAMES} ${status} ${statusText}`);
    return data.data;
  });
}
