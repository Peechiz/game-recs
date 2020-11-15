import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GameEntry from '../models/GameEntry.model';
import GameDetail from '../components/gameDetail';
import { getJumboSrc } from "../util/util";
import Precision from '../components/precision';
import Chip from '../components/chip';
import YouTubeEmbed from '../components/youtubeEmbed';

const DetailPage = ({ history }) => {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      const game = await (await fetch(`/api/games/${id}`)).json();
      const tags = await (await fetch(`/api/tags`)).json()

      game.tags = game.tags.map(tagID => tags.find(tag => tag._id === tagID).name)

      setEntry(new GameEntry(game));
    }
    fetchEntry();
  }, [id])

  let game;
  if (entry) {
    ({ game } = entry);
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
                <GameDetail entry={entry} back={() => history.push(`/`)} />
              </div>
              <div className="col-md-7 col-sm-12">
                <h1>{ game.name }</h1>
                <Precision lvl={entry.precision} />
                <h3>What is it?</h3>
                <p>{ entry.review }</p>
                <h3>Why should I play it?</h3>
                <p>{ entry.why }</p>
                <p>{ entry.tags.map(tag => <Chip key={tag} action={null} style={{cursor: 'default !important'}} noSpan={true}>{tag}</Chip>) }</p>
                <div className="d-flex">
                {
                  !!entry.videos && !!entry.videos.length &&
                  entry.videos.map(v => (
                      <div className="mr-2">
                        <YouTubeEmbed key={v.video_id} id={v.video_id}/>
                        <p className="font-weight-light">{v.name}</p>
                      </div>
                  ))
                }
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default DetailPage