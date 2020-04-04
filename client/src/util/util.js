// util

export const chooseRandom = arr => arr[Math.floor(Math.random() * arr.length)];

export const getJumboSrc = game =>
  (game && game.artworks)
    ? chooseRandom(game.artworks).url
    : "https://www.placecage.com/800/400";
