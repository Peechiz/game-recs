import React from "react";
import "../assets/styles/gameDetail.css";

const GameDetail = ({ entry, back }) => {
  const { game } = entry;

  return (
    <div className="ctn">
      <div className="card deets" style={{ width: "18rem" }}>
        {
          !!back &&
          <button onClick={() => back()} type="button" className="btn btn-dark closeBtn" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        }
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
          <small className="id-field">{entry._id}</small>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
