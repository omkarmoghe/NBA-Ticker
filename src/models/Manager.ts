import { StatusBarItem, Command } from "vscode";
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

  currentScore(): Score {
    return this.scores[this.currentPos];
  }

  updateScores(newScores: Score[]) {
    this.scores = newScores;
    this.lastUpdated = moment();
  }

  rollTicker() {
    if (this.ticker && this.scores && this.scores.length > 0) {
      const score = this.currentScore();
      const command: Command | null = score.uriLive ? {
        title: "Open Game",
        command: "vscode.open",
        arguments: [score.uri],
      } : null;
      this.setTicker(score.format(config("format")), this.getHover(), command);
      this.incrementPos();
    } else if (this.ticker) {
      this.setTicker("No games today.", this.humanLastUpdated());
    }
  }

  setTicker(text: string, tooltip: string | null = null, command: Command | null = null) {
    this.ticker.text = text;
    if (tooltip) {
      this.ticker.tooltip = tooltip;
    }
    if (command) {
      this.ticker.command = command;
    }

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

  getHover(): string {
    const hoverContent: string[] = [];

    if (config("hover") === "details") {
      hoverContent.push(...this.currentScore().details)
    } else if (config("hover") === "scoreboard") {
      this.scores.forEach((score) => {
        hoverContent.push(score.format(config("format")))
      });
    }

    hoverContent.push(this.humanLastUpdated());
    return hoverContent.join("\n");
  }
}
