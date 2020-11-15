import React, { useState } from "react";
import "../assets/styles/miniDetail.css";
import Chip from "../components/chip";
import Platform from "../components/platform";

const MiniDetail = ({ entry, click }) => {
  const { game } = entry;

  const [mouseOver, setMouseOver] = useState(false);
  
  const uniquePlatforms = (arr, platform) => {
    const { name } = platform;

    const notRepeatXbox = (arr, name) =>
      !/xbox/i.test(name) ||
      arr.map(p => p.name).every(n => !/xbox/i.test(n));
    const notRepeatPS = (arr, name) =>
      !/ps|playstation/i.test(name) ||
      arr.map(p => p.name).every(n => !/ps|playstation/i.test(n));

    if (notRepeatXbox(arr, name) && notRepeatPS(arr, name)) {
      arr.push(platform);
    }
    return arr;
  };

  return (
    <div
      className={`mini`}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={() => click()}
    >
      {game.cover && (
        <img
          src={game.cover.url}
          className={`thumb ${mouseOver & "blur"}`}
          alt="gameLogo"
        />
      )}
      <div className={`info`}>
        <div className="infoBox">
          <h5 className="mb-3"> {game.name} </h5>
          <ul>
            { !!game.time_to_beat &&
              !!game.time_to_beat.normally && 
              <li className="mb-1">~{Math.round(game.time_to_beat.normally / 60 / 60)} hours</li>
            }
          </ul>
          {entry.tags.map(tag => (
            <Chip key={`${entry._id}-${tag._id}`} noSpan={true}>
              {tag.name}
            </Chip>
          ))}
          <div className="platforms">
            {game.platforms &&
              game.platforms.reduce(uniquePlatforms, []).map(p => {
                return (
                  <Platform
                    platform={p}
                    style={{
                      marginleft: 7,
                      marginright: 7,
                      height: 25,
                      width: 25,
                      fill: "rgb(223, 223, 223)"
                    }}
                    key={p.name}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniDetail;
