import React, { useState } from 'react'
import GameDetail from '../components/gameDetail'
import { chooseRandom } from '../util/util'
import './Add.css';
import Form from '../components/form'

const AddGame = ({ entry, showTable }) => {
  const { game } = entry;

  const getJumboSrc = () => game.artworks ? chooseRandom(game.artworks).url : 'https://www.placecage.com/800/400';

  return (
    <div className="">
      <div className="jumbotron jumbotron-fluid hero" style={{ background: `url(${getJumboSrc()})` }}/>
      <div className="absctn">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-4">
              <GameDetail entry={entry} showTable={showTable}/>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-4">
            <Form onSubmit={showTable} entry={entry} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddGame