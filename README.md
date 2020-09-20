# Albicelestes

<!-- TOC -->

- [Data](#data)
  - [General rules](#general-rules)
  - [Specific rules](#specific-rules)
- [Tech](#tech)
  - [Development](#development)
    - [Testing](#testing)
    - [Console](#console)
  - [Deployment](#deployment)
  - [Other notes](#other-notes)

<!-- /TOC -->

## Data

Database: `/db/` (main file: `/db/matches.json`)

### General rules

- Historical data only
- No editorials (just short notes, photos and video links)

### Specific rules

- Final score: FT or AET (if aet or pen)
- Result: score (+ pen), eg. if score is 2-2 p. 5-4, then first team marked as winner (W)

## Tech

Built with: Next, Typescript, Tailwind

### Development

- `yarn now dev --listen 1986`

#### Testing

![prod](https://github.com/sobstel/albicelestes/workflows/.github/workflows/prod.yml/badge.svg?branch=master)
![codecov](https://codecov.io/gh/sobstel/albicelestes/branch/master/graph/badge.svg)

Running

- `yarn test --watch`
- `yarn lint && yarn test`

Structure

- Unit tests (for functions, helpers, utility; they use mocked data)
- React component tests (they use jsdom and mocked data)

#### Console

- `yarn console`

There are `DB.*`, `F`/`functions`, `H`/`helpers`, `U`/`utility` automatically included.

### Deployment

Automated with github actions. See [workflows](./github/workflows).

### Other notes

- Images uploaded and stored at cloudinary
