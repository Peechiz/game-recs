import React, { useState } from 'react'
import GameTable from '../components/gameTable'
import Spinner from '../components/spinner'
import AddEdit from './AddEdit'
import GameEntry from '../models/GameEntry.model'
import SearchBar from '../components/searchBar'
import '../assets/styles/Admin.css'


// redirect to Login if no token
const Admin = () => {
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [showAddGame, setShowAddGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState();
  const [loading, setLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [mode, setMode] = useState('search')

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
    <button onClick={() => setGame(game)} className="btn btn-primary">
      { mode === 'search' ? '+' : 'edit' }
    </button>
  );

  const setSearchMode = () => {
    if (mode !== 'search'){
      setGames([])
      setMode('search')
    }
  }

  const setBrowseMode = () => {
    if (mode !== 'browse'){
      fetchAllGames();
      setMode('browse')
    }
  }

  const fetchAllGames = async () => {
    const res = await fetch('/api/games');
    const json = await res.json();
    setGames(json.map(record => new GameEntry(record)));
  }

  const submitForm = () => {
    fetchAllGames();
    setShowAddGame(false);
  }

  const backAction = () => {
    setShowAddGame(false);
  }

  return (
    <>
      {!showAddGame ? (
        <div className="container">
          <div className="content">
            <h1><span className="rad" data-text="RADmin!">RADmin!</span> panel</h1>

            <nav className="nav nav-pills nav-justified mb-3">
              <span className={`nav-item nav-link ${mode === 'search' && 'active'}`}
                onClick={() => setSearchMode('search')}>Search</span>
              <span className={`nav-item nav-link ${mode === 'browse' && 'active'}`}
                onClick={() => setBrowseMode()}>Browse</span>
            </nav>
            {
              mode === 'search' &&
              <SearchBar search={search} setSearch={setSearch} onSearch={fetchGame} />
            }
            { !loading && !!games.length &&
              <GameTable entries={games} action={ActionBtn} />
            }
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
        <AddEdit
          mode={mode /** search || browse */}
          submitForm={submitForm}
          back={backAction}
          entry={selectedGame}
        />
      )}
    </>
  )
}

export default Admin