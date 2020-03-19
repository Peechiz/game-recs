import React, { useState } from "react";
import "./gameDetail.css";
import tribble from "bootstrap-icons/icons/three-dots.svg";

const GameDetail = ({ entry, showTable }) => {
  const [showSummary, setShowSummary] = useState(false);

  const { game } = entry;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <button onClick={() => showTable()} type="button" className="btn btn-dark closeBtn" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      {game.cover && (
        <img src={game.cover.url} className="card-img-top" alt="logo2x" />
      )}
      <div className="card-body">
        <h5 className="card-title">{game.name}</h5>
        { game.time_to_beat && game.time_to_beat.normally && (
          <p>~{Math.round(game.time_to_beat.normally / 60 / 60)} hours</p>
        )}
        <p>
          Platforms:
          <ul className="list-group">
            {game.platforms &&
              game.platforms.map(p => (
                <li key={p.name} className="font-weight-light smListItem">{p.name}</li>
              ))}
          </ul>
        </p>
        <p>
          Genres:
          <ul className="list-group">
            {game.genres &&
              game.genres.map(g => (
                <li key={g.name} className="font-weight-light smListItem">{g.name}</li>
              ))}
          </ul>
        </p>
      </div>
    </div>
  );
};

export default GameDetail;
