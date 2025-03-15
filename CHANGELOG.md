# Changelog

## [1.1.5] - 2025-03-13

### Added

- Added new style formatting options by @Alixmixx:
  - CamelCase: first word lowercase, subsequent words capitalized
  - SnakeCase: words separated by underscores
  - KebabCase: words separated by hyphens
  - PascalCase: all words capitalized
- Added comprehensive test coverage for all new style options

## [1.1.4] - 2023-07-31

### Changed

- Updated crypto library usage: Replaced `window.crypto` with Node.js `crypto` module for server-side compatibility.

## [1.1.3] - 2022-11-06

### Fixed

- Removal of some explicit words from the two dictionaries
- Fixed a small spelling mistake Retrive -> Retrieve
- Put adjective in first position before noun in generateUsername

**Full Changelog**: https://github.com/Alixmixx/unique-username-generator/compare/v1.1.1...v1.1.3