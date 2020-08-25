# NBA Ticker 🏀

Adds live(ish) NBA scores for today's games in your status bar. Built using the amazing [balldontlie API](https://www.balldontlie.io/#introduction). If you like this extension, please consider [donating](https://www.patreon.com/balldontlie) to them.

![Status bar ticker](./images/demo-gif-1.gif)

## Requirements

- VSCode must have a working internet connection.

## Installation

Install via the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=omkarmoghe.nba-ticker).

## Settings

All settings are prefixed by with `"nba-ticker."`, so `"side"` becomes `"nba-ticker.side"` when editing as JSON.

### `"format"`
Specifies how the game info should be displayed. Defaults to `"${visitorTeam} ${visitorScore} @ ${homeScore} ${homeTeam} | ${status}"`, which looks like `GSW 42 @ LAL 24 [4:20 3rd]`. The available wildcards are:
- `${visitorTeam}`: The visiting team's abbreviated name, (e.g. `"GSW"`)
- `${visitorScore}`: The visiting team's score
- `${homeTeam}`: The home team's abbreviated name, (e.g. `"LAL"`)
- `${homeScore}`: The home team's score
- `${status}`: The status of the game
  - If the game hasn't started yet, this will be the scheduled start time (e.g. `"6:30 PM ET"`)
  - If the game is ongoing, this will be either `"<TIME LEFT IN PERIOD> <PERIOD>"` (e.g. `"4:20 3rd"`), or `"Halftime"`
  - If the game is over, this will be `"FINAL"`

### `"pollDelaySeconds"`
Specifies how long to wait before fetching new game data from the API. The [balldontlie API](https://www.balldontlie.io/#considerations-3) updates games every ~10 minutes, so polling faster than that is pointless. Defaults to `60` seconds, i.e. every minute. Allowed values are [`10`, `600`].

### `"priority"`
Specifies the ticker's priority relative to other items in the status bar. **Higher values are shows more to the left.**

### `"side"`
Specifies which side of the status bar to display the ticker. Options are `"left"` or `"right"`.

### `"teamFilter"`
Specifies which teams games are shown for; other teams are ignored. All teams will be shown if the array is empty (`[]`). **Use abbreviated team names** (e.g. `"GSW"`, `"LAL"`).

### `"tickerDelaySeconds"`
Specifies how many seconds to show each score. Defaults to `10` seconds. Allowed values are [`1`, `60`].

## FAQ

### What is "live(ish)"?
The [balldontlie API](https://www.balldontlie.io/#considerations-3) updates games every ~10 minutes.
> Games will be updated every ~10 minutes

## [Changelog](./CHANGELOG.md)
