const router = require("express").Router();
const axios = require('axios').default;

const fixImg = (url, size) => 'https:' + url.replace(/t_.+\//, `${size}/`);

router.route('/:game')
  .get(
    async (req, res) => {
      await axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'user-key': process.env.IGDB_USER_KEY
        },
        data: `fields name,slug,summary,storyline,time_to_beat.*,url,websites.*,artworks.width,artworks.url,collection.games.name,cover.*,first_release_date,game_modes.*,genres.*,platforms.*;
        search "${req.params.game}";
        where category = 0 & cover != null;`
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

module.exports = router;
