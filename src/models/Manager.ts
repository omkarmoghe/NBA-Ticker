import { StatusBarItem, Command } from "vscode";
import { config } from "../extension";
import * as dayjs from "dayjs";
import * as relativeTime from 'dayjs/plugin/relativeTime';
import Score from "./Score";

dayjs.extend(relativeTime);

export default class Manager {
  ticker: StatusBarItem;
  scores: Score[];
  currentPos: number = 0;
  teams: string[];
  lastUpdated: dayjs.Dayjs | null = null;

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
    this.lastUpdated = dayjs();
  }

  allGamesFinal(): boolean {
    return this.scores.length > 0 &&
      this.scores.every((score) => score.final) &&
      dayjs().diff(this.lastUpdated, "day") >= 1;
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

    if (config("hideFinalScoresInStatusBar") === true && this.currentScore().final) {
      this.incrementPos();
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
