import React, { useState } from "react";
import GameTable from "../components/gameTable";
import witcher from "../witcher.json";
import AddGame from "./AddGame";
import GameEntry from "../models/GameEntry.model";
import Spinner from '../components/spinner'

const Search = () => {
  const [search, setSearch] = useState("");
  // const witcherEntries = witcher.map(game => new GameEntry({game}))
  const [games, setGames] = useState(/** witcherEntries */);
  const [showAddGame, setShowAddGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  const [loading, setLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  const onEnter = e => {
    if (e.key === 'Enter' && search !== ''){
      fetchGame();
    }
  }

  const fetchGame = async () => {
    setShowNotFound(false);
    setLoading(true);
    const res = await fetch(`/api/search/${search}`);
    const json = await res.json();
    if (json.length) {
      setGames(json.map(game => new GameEntry({ game })));
    } else {
      setShowNotFound(true);
    }
    setLoading(false);
  };

  const setGame = game => {
    setSelectedGame(game);
    setShowAddGame(true);
  };

  const ActionBtn = game => (
    <button onClick={() => setGame(game)} className="btn btn-primary">+</button>
  );

  return (
    <>
      {!showAddGame ? (
        <div className="container">
          <div className="content">
            <h1>Search for games to add to collection</h1>
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => onEnter(e)}
            />
            <button className="btn btn-primary" onClick={fetchGame}>
              search
            </button>
            { !loading && <GameTable entries={games} action={ActionBtn} />}
            <div className="row">
              <div className="col-md-12 d-flex justify-content-center">
                <Spinner show={loading}/>
              </div>
            </div>
            {
              showNotFound && <h1 className="text-center">No games found...</h1>
            }
          </div>
        </div>
      ) : (
        <AddGame entry={selectedGame} showTable={() => setShowAddGame(false)} />
      )}
    </>
  );
};

export default Search;
