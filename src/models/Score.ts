import Game from "./Game";

export default class Score {
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
      this.status = game.status.trim() || "TBD";
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
