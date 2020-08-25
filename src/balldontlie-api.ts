import axios from "axios";
import * as moment from "moment";

const API_VERSION = "v1";
const BASE_URL = `https://balldontlie.io/api/${API_VERSION}`;
const GAMES = `${BASE_URL}/games`;

const TEAM_MAP = {
  "ATL": 1,
  "BOS": 2,
  "BKN": 3,
  "CHA": 4,
  "CHI": 5,
  "CLE": 6,
  "DAL": 7,
  "DEN": 8,
  "DET": 9,
  "GSW": 10,
  "HOU": 11,
  "IND": 12,
  "LAC": 13,
  "LAL": 14,
  "MEM": 15,
  "MIA": 16,
  "MIL": 17,
  "MIN": 18,
  "NOP": 19,
  "NYK": 20,
  "OKC": 21,
  "ORL": 22,
  "PHI": 23,
  "PHX": 24,
  "POR": 25,
  "SAC": 26,
  "SAS": 27,
  "TOR": 28,
  "UTA": 29,
  "WAS": 30,
}

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
  period: number,
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

export class Score {
  visitorTeam: string;
  visitorScore: number;
  homeTeam: string;
  homeScore: number;
  status: string;

  constructor(game: Game) {
    this.visitorTeam = game.visitor_team.abbreviation.trim();
    this.visitorScore = game.visitor_team_score;
    this.homeTeam = game.home_team.abbreviation.trim();
    this.homeScore = game.home_team_score;
    // Determine status string.
    if (game.time.trim()) {
      this.status = `${game.time.trim()} ${this.humanPeriod(game.period)}`;
    } else {
      this.status = game.status.trim();
    }
  }

  humanPeriod(period: number): string {
    switch (period) {
      case 1:
        return `${period}st`;
      case 2:
        return `${period}nd`;
      case 3:
        return `${period}rd`;
      case 4:
      default:
        return `${period}th`;
    }
  }

  format(formatString: string) {
    return formatString
      .replace(/\${visitorTeam}/gi, this.visitorTeam)
      .replace(/\${visitorScore}/gi, this.visitorScore.toString())
      .replace(/\${homeTeam}/gi, this.homeTeam)
      .replace(/\${homeScore}/gi, this.homeScore.toString())
      .replace(/\${status}/gi, this.status);
  }
}

const today = () => moment().format("YYYY-MM-DD");

export function fetchGames(teams: number[] | null = null): Promise<Game[]> {
  const params = {
    dates: [today()],
    teams
  };

  return axios.get(GAMES, { params }).then(({ status, statusText, data }) => {
    console.info(`GET ${GAMES} ${status} ${statusText}`);
    return data.data;
  });
}
