import Team from "./Team";

interface Arena {
  name: string;
  city: string;
  stateAbbr: string;
}

interface Nugget {
  text: string,
}

interface Period {
  current: number,
  isEndOfPeriod: boolean,
  isHalftime: boolean,
}

interface Playoffs {
  gameNumInSeries: string,
  roundNum: string,
  seriesSummaryText: string,
}

export default interface Game {
  arena: Arena;
  clock: string,
  endTimeUTC?: string,
  gameId: string,
  hTeam: Team,
  nugget: Nugget,
  period: Period,
  playoffs?: Playoffs,
  seasonYear: string,
  startTimeUTC?: string,
  tags: string[],
  vTeam: Team,
}
