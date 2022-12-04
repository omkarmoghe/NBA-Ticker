interface Period {
  period: number,
  score: string,
}

export default interface Team {
  losses: number,
  periods: Period[];
  score: number,
  seed?: number,
  teamCity: string,
  teamId: number,
  teamName: string,
  teamTricode: string,
  wins: number;
}
