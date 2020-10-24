# NBA Ticker 🏀

Adds live(ish) NBA scores for today's games in your status bar using the data.nba.net API.

Versions **before** `0.3.0` were built using the amazing [balldontlie API](https://www.balldontlie.io/#introduction). If you like this extension, please consider [donating](https://www.patreon.com/balldontlie) to them.

![Status bar ticker](https://i.imgur.com/9UBEw9f.gif)

![Tooltip](https://i.imgur.com/dW8HKoh.png)

## Requirements

- VSCode must have a working internet connection.

## Installation

Install via the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=omkarmoghe.nba-ticker).

## Settings

All settings are prefixed by with `"nba-ticker."`, so `"side"` becomes `"nba-ticker.side"` when editing as JSON.

### `"format"`
Specifies how the game info should be displayed. Defaults to `"${vTeam} ${vScore} : ${hScore} ${hTeam} @ ${status}"`, which looks like `GSW 42 : 24 LAL @ 4:20 1st`. The available wildcards are:
- `${vTeam}`: The visiting team's abbreviated name, (e.g. `"GSW"`)
- `${vScore}`: The visiting team's score
- `${hTeam}`: The home team's abbreviated name, (e.g. `"LAL"`)
- `${hScore}`: The home team's score
- `${status}`: The status of the game
  - If the game hasn't started yet, this will be the scheduled start time (e.g. `"9:30 PM"`) in your local UTC offset.
  - If the game is ongoing, this will be either `"<TIME LEFT IN PERIOD> <PERIOD>"` (e.g. `"4:20 1st"`), `End of 1st`, or `"Halftime"`
  - If the game is over, this will be `"Final"`
  - If the status is unknown, this will be `"TBD"`

### `"pollDelaySeconds"`
Specifies how long to wait before fetching new game data from the API. Defaults to `60` seconds, i.e. every minute. Allowed values are [`10`, `600`].

### `"priority"`
Specifies the ticker's priority relative to other items in the status bar. **Higher values are shows more to the left.**

### `"side"`
Specifies which side of the status bar to display the ticker. Options are `"left"` or `"right"`.

### `"teamFilter"`
Specifies which teams games are shown for; other teams are ignored. All teams will be shown if the array is empty (`[]`). **Use abbreviated team names** (e.g. `["GSW", "LAL"]`).

### `"tickerDelaySeconds"`
Specifies how many seconds to show each score. Defaults to `10` seconds. Allowed values are [`1`, `60`].

## FAQ

### What is "live(ish)"?
Updates as fast as the data.nba.net API does. For versions before `0.3.0`, the [balldontlie API](https://www.balldontlie.io/#considerations-3) updates games every ~10 minutes.

## [Changelog](./CHANGELOG.md)
