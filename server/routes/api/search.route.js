const router = require("express").Router();
const axios = require('axios').default;
const { gameQueryBase, fixImg } =  require('../util/queryUtils');


function searchRoute(app) {
  router.route('/:game')
    .get(
      async (req, res) => {
        const headers = {
          'Client-ID': process.env.CLIENT_ID,
          Authorization: `Bearer ${app.locals.token.access_token}`
        }
        await axios({
          url: "https://api.igdb.com/v4/games",
          method: 'POST',
          headers,
          data: gameQueryBase + `search "${req.params.game}";where category = 0 & cover != null;`
        })
          .then(response => {
            return res.json(response.data.map(game => {
              if (game.cover) {
                game.cover.url = fixImg(game.cover.url, 't_cover_big')
              }
              if (game.artworks){
                game.artworks = game.artworks.map(art => {
                  art.url = fixImg(art.url, 't_720p');
                  return art;
                })
              }
              return game;
            }))
          })
          .catch(err => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    )
  return router
}

module.exports = searchRoute;
