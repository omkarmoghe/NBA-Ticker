import { StatusBarItem } from "vscode";
import { Score } from "./balldontlie-api";
import { config } from "./extension";
import * as moment from "moment";

const now: () => string = () => moment().toISOString();

export default class Manager {
  ticker: StatusBarItem;
  scores: Score[];
  currentPos: number = 0;
  teams: string[];
  lastUpdated: string = "Waiting for games...";

  constructor(ticker: StatusBarItem, scores: Score[] = []) {
    this.ticker = ticker;
    this.scores = scores;
    this.teams = config("teamFilter");
  }

  updateScores(newScores: Score[]) {
    this.scores = newScores;
    this.lastUpdated = now();
    this.ticker.tooltip = `Updated at ${this.lastUpdated}`;
  }

  rollTicker() {
    if (this.ticker && this.scores) {
      const score = this.scores[this.currentPos];
      this.setTicker(score.format(config("format")));
      this.incrementPos();
    } else if (this.ticker) {
      this.setTicker("No games today.");
    }
  }

  setTicker(text: string) {
    this.ticker.text = text;
    this.ticker.show();
  }

  incrementPos() {
    this.currentPos++;
    if (this.currentPos >= this.scores.length) {
      this.currentPos = 0;
    }
  }
}
