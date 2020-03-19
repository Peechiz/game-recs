import React, { useState, useEffect } from 'react'
import GameTable from '../components/gameTable'
import AddGame from './AddGame'
import GameEntry from '../models/GameEntry.model';

const Browse = () => {

  const [games, setGames] = useState();
  const [showAddGame, setShowAddGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  const setGame = game => {
    setSelectedGame(game);
    setShowAddGame(true);
  };


  const ActionBtn = (game) => <button onClick={() => setGame(game)} className="btn btn-primary">Edit</button>

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/games');
      const json = await res.json();
      setGames(json.map(record => new GameEntry(record)));
    })()
  }, [])

  return (
    <>
      {!showAddGame ? (
        <div className="container">
          <div className="content">
            <h1>Browse</h1>
            <GameTable entries={games} action={ActionBtn}/>
          </div>
        </div>
      ) : (
        <AddGame entry={selectedGame} showTable={() => setShowAddGame(false)}/>
      )}
    </>
  )
}

export default Browse