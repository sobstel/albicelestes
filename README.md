# Albicelestes

## Development

`now dev --listen 1986`

## Deployment

- staging/dev: `now`
- prod: push to master and github action will deploy it

## Database

Git-tracked. Powered by lowdb (json db).

- `./db/jsize.sh` - to update and prepare database for production
