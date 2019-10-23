# Albicelestes

## Development

`now dev --listen 1986`

## Database

Git-tracked. Powered by lowdb (json db).

- `hyena.json` - imported from Hyena service

### Importing data

`./db/hyena -y 2019`

It's data-safe. It does NOT re-import already imported data.
It updates both `hyena.json` and `hyena.js` files.
