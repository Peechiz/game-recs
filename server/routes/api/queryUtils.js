module.exports = {
  gameQueryBase: `fields name,slug,summary,storyline,time_to_beat.*,url,websites.*,artworks.width,artworks.url,collection.games.name,cover.*,first_release_date,game_modes.*,genres.*,platforms.*,platforms.product_family.*;`,
  fixImg: (url, size) => 'https:' + url.replace(/t_.+\//, `${size}/`),
}