# Dude, You Totally Have to Play...

A tag-based game library for sharing the junk I liked playing, based on [Internet Game Database (IGDB)](https://www.igdb.com/).

![https://github.com/Peechiz/game-recs/blob/readme/DYTHTP_splash.jpg](https://github.com/Peechiz/game-recs/blob/readme/DYTHTP_splash.jpg)

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

Sign up for a a free dev account with [Twitch](https://dev.twitch.tv/), and add a `.env` file to the root with the following:
```
CLIENT_ID=<twitch client id>
CLIENT_SECRET=<twitch client secret>
K=<JSON array of SECRET CODE INPUTS TO GET TO THE LOGIN PAGE I WAS FEELING EXTRA TODAY>
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

IGDB's api is pretty quirky (see `queryUtils.js`), but their documentation is pretty good and they have a discord community.
