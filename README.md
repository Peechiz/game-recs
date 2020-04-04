# Dude, You Totally Have to Play...

A tag-based game library for sharing the junk I liked playing 

## Installation

with Yarn:
```
yarn; cd client && yarn
```

or with NPM
```
npm i; cd client && npm i;
```

With MongoDB running, the app will create a database called `gamerec`, but this can be adjusted in `server/config/db.js` if you'd rather point it somewhere else.

Sign up for a a free API account with [Internet Game Database](https://api.igdb.com/), and add a `.env` file to the root with the following:
```
KEY=<some-secret-for-securing-login-maybe>
IGDB_USER_KEY=<IGDB-API-key>
```

## Usage

note: this startup junk will probably get cleaned up later when I start thinking about deploying

Run mongo
```
mongod
```

Start Server
```
npm run server
```

Start Client
```
npm run client
```

### First Time

The `HOME` page is the landing intended for users that are not the admin.  The first time loaded this screen will be blank.  Procede to the `ADMIN` page and add some games!

Use the `search` bar to find games that you've played, and then click the `+` to create a new game entry.  Fill out the form and add tags to make the game searchable. Once you submit some games, you can browse them in `Browse` or edit tags in the `Tagger`.

## TODO
- [ ] Admin Login / Secure API
- [x] Add/Edit Games
- [ ] Mobile styling for Landing / Display page
- [ ] Add price information to Display page
- [x] Add tag metadata (icon, definition lookup)
- [ ] Bulk delete/Bulk update Tags

... and a few other details in TODO.txt

## Notes

IGDB's api is pretty quirky (see `queryUtils.js`), but they're documentation is pretty good, and they have a discord community.