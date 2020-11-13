module.exports = {
  gameQueryBase: `fields name,slug,summary,storyline,url,websites.*,artworks.width,artworks.url,collection.games.name,cover.*,first_release_date,game_modes.*,genres.*,platforms.*,platforms.platform_families;`,
  fixImg: (url, size) => 'https:' + url.replace(/t_.+\//, `${size}/`),
}