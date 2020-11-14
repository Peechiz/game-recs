const router = require("express").Router();
const axios = require('axios').default;

function videoRoute(app) {
  router.route('/:gameID')
    .get(
      async (req, res) => {
        const headers = {
          'Client-ID': process.env.CLIENT_ID,
          Authorization: `Bearer ${app.locals.token.access_token}`
        }
        await axios({
          url: "https://api.igdb.com/v4/game_videos",
          method: 'POST',
          headers,
          data: `fields game,name,video_id;where game=${req.params.gameID};`
        })
          .then(response => {
            res.json(response.data)
          })
          .catch(err => {
            console.error(err);
            res.sendStatus(500);
          });
      }
    )
  return router
}

module.exports = videoRoute;
