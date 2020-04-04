import React from "react";
import GameDetail from "../components/gameDetail";
import { getJumboSrc } from "../util/util";
import "../assets/styles/AddEdit.css";
import Form from "../components/form";

const AddEdit = ({ entry, submitForm, back }) => {
  const { game } = entry;

  return (
    <div>
      <div
        className="jumbotron jumbotron-fluid hero"
        style={{ background: `url(${getJumboSrc(game)})` }}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <GameDetail entry={entry} back={back} />
          </div>
          <div className="col-md-9">
            <Form onSubmit={submitForm} entry={entry} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEdit;
