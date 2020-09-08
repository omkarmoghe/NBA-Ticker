import Team from "./Team";

export default interface Game {
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
