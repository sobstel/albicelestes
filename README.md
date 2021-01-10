# Albicelestes

<!-- TOC -->

- [Data](#data)
  - [General rules](#general-rules)
  - [Specific rules](#specific-rules)
- [Tech](#tech)
  - [Development](#development)
  - [Directory structure](#directory-structure)
    - [Testing](#testing)
    - [CLI](#cli)
      - [Console](#console)
  - [Deployment](#deployment)
  - [Other notes](#other-notes)

<!-- /TOC -->

## Data

Database: `/data/` (main file: `/data/matches.json`)

### General rules

- Historical data only
- No editorials (just short notes, photos and video links)

### Specific rules

- Final score: FT or AET (if aet or pen)
- Result: score (+ pen), eg. if score is 2-2 p. 5-4, then first team marked as winner (W)

## Tech

Built with: Next, Typescript, Tailwind

### Development

- `yarn vercel dev --listen 1986`

### Directory structure

- components
- pages
- data
- helpers
  - collectXXX - reduce-like
  - findXXX
  - getXXX
  - produceXXX - map-like
  - filter (rejectXXX/selectXXX)
  - sortByXXX

#### Testing

![prod](https://github.com/sobstel/albicelestes/workflows/.github/workflows/prod.yml/badge.svg?branch=master)
![codecov](https://codecov.io/gh/sobstel/albicelestes/branch/master/graph/badge.svg)

Running

- `yarn test --watch`
- `yarn lint && yarn test`

Structure

- Unit tests (for functions, helpers, utility; they use mocked data)
- React component tests (they use jsdom and mocked data)

#### CLI

`./bin/dios`

##### Console

- `./bin/dios console`

There are `DB.*`, `F`/`functions`, `H`/`helpers`, `U`/`utility` automatically included.

### Deployment

Automated with github actions. See [workflows](./github/workflows).

### Other notes

- Images uploaded and stored at cloudinary
