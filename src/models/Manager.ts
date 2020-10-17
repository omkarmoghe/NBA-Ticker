import { StatusBarItem } from "vscode";
import { config } from "../extension";
import * as moment from "moment";
import Score from "./Score";

export default class Manager {
  ticker: StatusBarItem;
  scores: Score[];
  currentPos: number = 0;
  teams: string[];
  lastUpdated: moment.Moment | null = null;

  constructor(ticker: StatusBarItem, scores: Score[] = []) {
    this.ticker = ticker;
    this.scores = scores;
    this.teams = config("teamFilter");
  }

  updateScores(newScores: Score[]) {
    this.scores = newScores;
    this.lastUpdated = moment();
  }

  rollTicker() {
    if (this.ticker && this.scores && this.scores.length > 0) {
      const score = this.scores[this.currentPos];
      this.setTicker(
        score.format(config("format")),
        [...score.details, this.humanLastUpdated()].join("\n")
      );
      this.incrementPos();
    } else if (this.ticker) {
      this.setTicker("No games today.", this.humanLastUpdated());
    }
  }

  setTicker(text: string, tooltip: string = "") {
    this.ticker.text = text;
    this.ticker.tooltip = tooltip;

    this.ticker.show();
  }

  incrementPos() {
    this.currentPos++;
    if (this.currentPos >= this.scores.length) {
      this.currentPos = 0;
    }
  }

  humanLastUpdated(): string {
    if (this.lastUpdated) {
      return `Updated ${this.lastUpdated.fromNow()}.`;
    } else {
      return "Waiting for games...";
    }
  }
}
