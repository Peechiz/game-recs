class GameEntry {
  _id;
  game;
  tags;
  review;
  why;
  precision;
  videos;

  constructor({_id, game, tags, review, precision, why, videos}){
    this._id = _id || null
    this.game = game || {}
    this.tags = tags || []
    this.precision = precision || null
    this.review = review || ''
    this.why = why || ''
    this.videos = videos || []
  }
}

export default GameEntry;