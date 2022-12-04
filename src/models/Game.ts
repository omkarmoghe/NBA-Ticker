import Team from "./Team";

export default interface Game {
  awayTeam: Team,
  gameClock: string,
  gameId: string,
  gameStatusText: string,
  gameTimeUTC: string,
  homeTeam: Team,
  period: number,
  regulationPeriods: number,
  seriesGameNumber?: string;
  seriesText?: string;
}
