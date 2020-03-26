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

Built with next.js.

### Development

`yarn now dev --listen 1986`

### Deployment

- staging/dev: `yarn now`
- prod: automated (on push)

### Other notes

- Images uploaded and stored at cloudinary
