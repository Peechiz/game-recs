class GameEntry {
  _id;
  game;
  tags;
  review;
  why;
  precision;

  constructor({_id, game, tags, review, precision, why}){
    this._id = _id || null
    this.game = game || {}
    this.tags = tags || []
    this.precision = precision || null
    this.review = review || ''
    this.why = why || ''
  }
}

export default GameEntry;