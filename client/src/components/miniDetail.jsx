import React, { useState } from "react";
import "../assets/styles/miniDetail.css";
import Chip from '../components/chip'

const MiniDetail = ({ entry }) => {
  const { game } = entry;

  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div className={`mini`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      { game.cover &&
        <img src={game.cover.url} className={`thumb ${mouseOver & 'blur'}`} alt="gameLogo"/>
      }
      <div className={`info`}>
        <h5> { game.name } </h5>
        <ul>
          { game.time_to_beat &&
            game.time_to_beat.normally && 
            <li className="mb-1">~{Math.round(game.time_to_beat.normally / 60 / 60)} hours</li>
          }
          { game.platforms &&
            <li className="font-weight-light smTxt">
              { 
                game.platforms.map((p, i) => {
                  let comma = (game.platforms.length > 1 && i !== game.platforms.length -1)
                  return (<span key={p.name}>{p.name}{comma && ', '}</span>)
                })
              }
            </li>
     
          }
        </ul>
        { entry.tags.map(tag => <Chip noSpan={true}>{tag}</Chip>) }
      </div>
    </div>
  );
};

export default MiniDetail;
