interface LineScore {
  score: string,
}

export default interface Team {
  linescore: LineScore[],
  loss: string,
  score: string,
  seriesLoss?: string,
  seriesWin?: string,
  teamId: string,
  triCode: string,
  win: string,
}
