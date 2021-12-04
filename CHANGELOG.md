# Change Log

All notable changes to the "nba-ticker" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.2] - 2021-12-04
### Changed
- Bumped dependencies
- Updated default format `@` -> `, `, `:` -> `-`
- Updated description

## [0.4.1] - 2021-03-21
### Changed
- Updated gif in README

## [0.4.0] - 2021-03-21
### Added
- New hover view shows all games instead of game details (option in settings)
### Changed
- Bumped various dependencies

## [0.3.7] - 2020-12-17
### Changed
- Fixed an issue where empty game "nugget" text resulted in an empty line in the tooltip

## [0.3.6] - 2020-12-14
### Changed
- Bump dependencies

## [0.3.5] - 2020-11-11
### Added
- README release version shield

## [0.3.4] - 2020-10-26
### Changed
- Fixed minimum poll delay validation

## [0.3.3] - 2020-10-24
### Changed
- Bumped project Node version from `14.13.1` -> `15.0.0`

## [0.3.2] - 2020-10-17
### Added
- Clicking on the status bar Ticker opens the game in https://stats.nba.com
### Changed
- Fixed settings & README

## [0.3.1] - 2020-10-17
### Changed
- Fixed images on Marketplace page

## [0.3.0] - 2020-10-17
### Changed
- Migrated from the balldontlie API to official(?) data.nba.net API
- Updated status
### Added
- Huge update to the tooltip with a ton of game and series details

## [0.2.5] - 2020-10-17
### Changed
- Bumped Node to `14.13.1`
- Bumped Typescript & dependencies to `^4`
- Bumped ESLint, Moment, Axios

## [0.2.4] - 2020-09-08
### Changed
- Fixed typo in file/module naming

## [0.2.3] - 2020-09-08
### Changed
- Fixed typo in settings

## [0.2.2] - 2020-09-08
### Changed
- Updated default ticker display format.
- Updated ticker tooltip to show relative time of update (e.g. `"5 minutes ago"`)

## [0.2.1] - 2020-08-25
### Added
- Setting for teams
### Changed
- Updated default format separator from `|` to `-`

## [0.2.0] - 2020-08-25
### Added
- Setting for poll frequency
- Settings for status bar placement, format, and duration
### Changed
- Breaking changes to registered commands

## [0.0.2] - 2020-08-19
### Changed
- Fixed date to use current date

## [0.0.1] - 2020-08-19
### Added
- Status bar item to display scores
- Command to update scores (no UI)
