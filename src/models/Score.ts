import * as moment from "moment";
import Game from "./Game";

export default class Score {
  awayScore: number;
  awayTeam: string;
  details: string[] = [];
  gameId: string;
  homeScore: number;
  homeTeam: string;
  status: string;
  tipoff: moment.Moment;
  url: string;
  urlLive: boolean;

  constructor(game: Game) {
    this.gameId = game.gameId;

    this.awayScore = game.awayTeam.score;
    this.awayTeam = game.awayTeam.teamTricode;
    this.homeScore = game.homeTeam.score;
    this.homeTeam = game.homeTeam.teamTricode;
    this.tipoff = moment(game.gameTimeUTC);

    this.url = `https://www.nba.com/game/${this.awayTeam}-vs-${this.homeTeam}-${this.gameId}`.toLowerCase();
    this.urlLive = moment() >= this.tipoff

    this.status = this.buildStatus(game);

    // Set playoff details.
    if (game.seriesGameNumber) {
      this.details.push(`Game ${game.seriesGameNumber}`);
    }
    if (game.seriesText) {
      this.details.push(`Game ${game.seriesText}`);
    }
    // Set team details.
    this.details.push(
      `${game.awayTeam.teamCity} ${game.awayTeam.teamName} (${game.awayTeam.wins} - ${game.awayTeam.losses})`
    );
    this.details.push(
      `${game.homeTeam.teamCity} ${game.homeTeam.teamName} (${game.homeTeam.wins} - ${game.homeTeam.losses})`
    );
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

  format(formatString: string): string {
    return formatString
      .replace(/\${vTeam}/gi, this.awayTeam)
      .replace(/\${vScore}/gi, this.awayScore.toString(10))
      .replace(/\${hTeam}/gi, this.homeTeam)
      .replace(/\${hScore}/gi, this.homeScore.toString(10))
      .replace(/\${status}/gi, this.status);
  }

  // Determine status string.
  buildStatus(game: Game): string {
    if (this.tipoff) {
      if (moment() < this.tipoff || game.period < 1) {
        return this.tipoff.format("h:mm A");
      } else {
        return game.gameStatusText;
      }
    } else {
      return "TBD";
    }
  }
}
