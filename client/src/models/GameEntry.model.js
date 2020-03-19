class GameEntry {
  _id;
  game;
  tags;
  review;
  constructor({_id, game, tags, review}){
    this._id = _id || null
    this.game = game || {}
    this.tags = tags || []
    this.review = review || ''
  }
}

export default GameEntry;