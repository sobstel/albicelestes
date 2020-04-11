# Albicelestes

## Data

Database: `/db/` (main file: `/db/matches.json`)

### General rules

- Historical data only
- No editorials (just short notes, photos and video links)

### Specific rules

- Final score: FT or AET (if aet or pen)
- Result: score (+ pen), eg. if score is 2-2 p. 5-4, then first team marked as winner (W)

## Tech

Built with **Next.js** and **TypeSscript**.

### Development

- `yarn now dev --listen 1986`

#### Testing

- `yarn test --watch`
- `yarn lint && yarn test`

#### Console

- `yarn console`

There are `DB.*`, `F`/`functions`, `H`/`helpers`, `U`/`utility` automatically included.

### Deployment

- staging/dev: `yarn now`
- prod: automated (on push)

### Other notes

- Images uploaded and stored at cloudinary
