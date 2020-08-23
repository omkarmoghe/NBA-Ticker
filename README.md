# NBA Ticker 🏀

Adds live(ish) NBA scores for today's games in your status bar. Built using the amazing [balldontlie API](https://www.balldontlie.io/#introduction). If you like this extension, please consider [donating](https://www.patreon.com/balldontlie) to them.

![Status bar ticker](./images/screenshot-1.png)

## Requirements

- VSCode must have a working internet connection.

## Installation

Install via the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=omkarmoghe.nba-ticker).

## Extension Settings

All settings are prefixed by with `"nba-ticker."`, so `"side"` becomes `"nba-ticker.side"` when editing as JSON.

### `"side"`
Specifies which side of the status bar to display the ticker. Options are `"left"` or `"right"`.

### `"priority"`
Specifies the ticker's priority relative to other items in the status bar. **Higher values are shows more to the left.**

### `"teamFilter"`
Specifies which teams games are shown for; other teams are ignored. All teams will be shown if the array is empty (`[]`). Use abbreviated team names (e.g. `\"GSW\"`, `\"LAL\"`).

### `"pollDelaySeconds"`
Specifies how long to wait before fetching new game data from the API. The [balldontlie API](https://www.balldontlie.io/#considerations-3) updates games every ~10 minutes, so polling faster than that is pointless. Defaults to `60` seconds, i.e. every minute.

## FAQ

### What is "live(ish)"?
The [balldontlie API](https://www.balldontlie.io/#considerations-3) updates games every ~10 minutes.
> Games will be updated every ~10 minutes

## [Changelog](./CHANGELOG.md)
