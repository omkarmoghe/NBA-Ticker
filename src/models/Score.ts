import * as moment from "moment";
import Game from "./Game";

export default class Score {
  details: string[] = [];
  gameId: string;
  hScore: string;
  hTeam: string;
  status: string;
  tipoff: moment.Moment;
  url: string;
  vScore: string;
  vTeam: string;

  constructor(game: Game) {
    this.gameId = game.gameId;
    this.hScore = game.hTeam.score.trim();
    this.hTeam = game.hTeam.triCode;
    this.vScore = game.vTeam.score.trim();
    this.vTeam = game.vTeam.triCode;
    this.tipoff = moment(game.startTimeUTC);
    this.url = `https://stats.nba.com/game/${this.gameId}`;

    // Determine status string.
    if (this.tipoff) {
      if (moment() <= this.tipoff) {
        this.status = this.tipoff.format("h:mm A");
      } else if (game.endTimeUTC && moment() > moment(game.endTimeUTC)) {
        this.status = "Final"
      } else if (game.period.isHalftime) {
        this.status = "Halftime"
      } else {
        const period = this.humanPeriod(game.period.current);
        if (game.period.isEndOfPeriod) {
          this.status = `End of ${period}`;
        } else {
          this.status = `${game.clock.trim()} ${period}`;
        }
      }
    } else {
      this.status = "TBD";
    }

    // Set game details.
    if (game.nugget.text.trim().length > 0) {
      this.details.push(game.nugget.text.trim());
    }
    // Set playoff details.
    if (game.playoffs) {
      if (game.playoffs.seriesSummaryText.trim().length > 0) {
        this.details.push(game.playoffs.seriesSummaryText.trim());
      }
      this.details.push(`Round ${game.playoffs.roundNum}, Game ${game.playoffs.gameNumInSeries}`);
    }
    // Set team details.
    this.details.push(`${this.vTeam} (${game.vTeam.win} - ${game.vTeam.loss}) @ ${this.hTeam} (${game.hTeam.win} - ${game.hTeam.loss})`);
    // Set location details.
    this.details.push(`${game.arena.city}, ${game.arena.stateAbbr}`)
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
      .replace(/\${vTeam}/gi, this.vTeam)
      .replace(/\${vScore}/gi, this.vScore)
      .replace(/\${hTeam}/gi, this.hTeam)
      .replace(/\${hScore}/gi, this.hScore)
      .replace(/\${status}/gi, this.status);
  }
}
