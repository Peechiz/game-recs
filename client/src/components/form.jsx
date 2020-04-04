import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import GameEntry from "../models/GameEntry.model";
import Chip from "./chip";

const Form = ({ entry, onSubmit }) => {
  const [tags, setTags] = useState(entry.tags);
  const [helpTags, setHelpTags] = useState();
  const [review, setReview] = useState(entry.review);
  const [tagInputText, setTagInputText] = useState("");
  const [precision, setPrecision] = useState(entry.precision || 3);
  const [whyPlay, setWhyPlay] = useState(entry.why);
  const [deleteEnabled, setDeleteEnabled] = useState(false);

  
  useEffect(() => {
    const fetchHelpTags = async () => {
      const res = await fetch("/api/tags");
      const json = await res.json();
      setHelpTags(json.map(tag => ({ name: tag, active: tags.includes(tag) })));
    };
    fetchHelpTags();
  }, [tags]);

  const removeTag = tag => setTags([...tags.filter(t => t !== tag)]);

  const addTags = () => {
    const newTags = tagInputText.split(",").map(tag => tag.trim());

    setTags(Array.from(new Set([...tags, ...newTags])));
    setTagInputText("");
  };

  const addTag = tag => {
    setTags(Array.from(new Set([...tags, tag])));
  };

  const tagSort = (a, b) =>
    a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;

  const submitForm = async () => {
    await fetch(`/api/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        new GameEntry({
          _id: entry._id,
          game: entry.game,
          why: whyPlay,
          tags,
          review,
          precision,
        })
      )
    });
    onSubmit();
  };

  const deleteGame = async () => {
    await fetch(`/api/games/${entry._id}`, {
      method: "DELETE"
    });
    onSubmit();
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="form-group">
          {/* REVIEW */}
          <div className="form-group">
            <label htmlFor="review">What is it?</label>
            <textarea
              className="form-control"
              id="review"
              rows="3"
              value={review}
              onChange={e => setReview(e.target.value)}
            />
          </div>

          {/* WHY PLAY IT? */}
          <div className="form-group">
            <label htmlFor="review">Why should I play it?</label>
            <textarea
              className="form-control"
              id="why"
              rows="3"
              value={whyPlay}
              onChange={e => setWhyPlay(e.target.value)}
            />
          </div>

          {/* CONTROL PRECISION */}
          <div className="form-group">
            <label className="mb-0" htmlFor="controlSelect">Control Precision</label>
            <small id="tagHelp" className="form-text text-muted">
              How precise do you need to be with the controller?
            </small>
            <select value={precision} onChange={e => setPrecision(e.target.value)} className="form-control" id="exampleFormControlSelect1">
              <option value={1}>1 - low</option>
              <option value={2}>2</option>
              <option value={3}>3 - medium</option>
              <option value={4}>4</option>
              <option value={5}>5 - high</option>
            </select>
          </div>

          {/* TAGS */}
          <div className="form-group">
            <label className="mb-0" htmlFor="tags">Tags</label>
            <small id="tagHelp" className="form-text text-muted">
              Mulit-word and comma-separated tags.
            </small>
            {/* TAG MAKER */}
            <div className="input-group mb-3">
              <input
                className="form-control"
                id="tags"
                type="text"
                value={tagInputText}
                onChange={e => setTagInputText(e.target.value)}
              />
              <div className="input-group-append">
                <button onClick={addTags} className="btn btn-outline-secondary">
                  Add Tags
                </button>
              </div>
            </div>

            {/* TAG SELECTION*/}
            <div className="input-group">
              {tags.map(tag => (
                <Chip key={tag} action={() => removeTag(tag)} isRemove={true}>
                  {tag}
                </Chip>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="form-group">
            <button onClick={() => submitForm()} className="btn btn-primary">
              Submit
            </button>
            {entry._id && (
              <button
                disabled={!deleteEnabled}
                onClick={() => deleteGame()}
                className="btn btn-danger mx-2"
              >
                Delete
              </button>
            )}
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="checkbox" id="enableDelete" value={deleteEnabled}
                onChange={() => setDeleteEnabled(!deleteEnabled)}
              />
              <label className="form-check-label" htmlFor="enableDelete">enable delete?</label>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <h1>tags</h1>
        {// inactive tags
          helpTags &&
          helpTags
            .sort(tagSort)
            .filter(tag => !tag.active)
            .map(tag => (
              <Chip
                key={tag.name}
                action={() => addTag(tag.name)}
                isRemove={false}
              >
                {tag.name}
              </Chip>
        ))}
      </div>
    </div>
  );
};

export default Form;
