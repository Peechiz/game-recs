import React from "react";
import * as Moment from "moment";
import "../assets/styles/gameTable.css";
import GameEntry from "../models/GameEntry.model";

const GameTable = ({ entries, action }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col"></th>{/* img */}
          <th scope="col">Title</th>
          <th scope="col">Year</th>
          <th scope="col">Genre</th>
          <th scope="col"></th>{/* detail */}
        </tr>
      </thead>
      <tbody>
        { entries && entries.map((entry, i) => {
          const { game } = entry;
          return (
            <tr key={`${game.name}${i}`}>
              <td>{game.cover && <img className="td" src={game.cover.url} />}</td>
              <td><h5>{game.name}</h5></td>
              <td>{Moment.unix(game.first_release_date).format("Y")}</td>
              <td className="sm">
                <ul>
                  { game.genres &&
                    game.genres.reduce((arr, g) => {
                      arr.push(g.name);
                      return arr;
                    }, []).map(g => <li key={`${game.name}${g}`} className="sm">{g}</li>)}
                </ul>
              </td>
              <td>{ action(new GameEntry(entry)) }</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default GameTable;
