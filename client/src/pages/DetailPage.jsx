import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GameEntry from '../models/GameEntry.model';
import GameDetail from '../components/gameDetail';
import { getJumboSrc } from "../util/util";
import Precision from '../components/precision';
import Chip from '../components/chip';

const DetailPage = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      console.log('FETCH GAME', id);

      const res = await fetch(`/api/games/${id}`);
      const json = await res.json();
      setEntry(new GameEntry(json));
    }
    fetchEntry();
  }, [id])

  let game;
  if (entry) {
    console.log(entry)
    game = entry.game;
  }

  return (
    <>
      { game && 
        <>
          <div
            className="jumbotron jumbotron-fluid hero d-sm-none d-md-block"
            style={{ background: `url(${getJumboSrc(game)})` }}
          />
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                <GameDetail entry={entry} back={() => {}} />
              </div>
              <div className="col-md-7 col-sm-12">
                <h1>{ game.name }</h1>
                <Precision lvl={entry.precision} />
                <h3>What is it?</h3>
                <p>{ entry.review }</p>
                <h3>Why should I play it?</h3>
                <p>{ entry.why }</p>
                <p>{ entry.tags.map(tag => <Chip action={null} style={{cursor: 'default !important'}} noSpan={true}>{tag}</Chip>) }</p>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default DetailPage