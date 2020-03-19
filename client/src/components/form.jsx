import React, { useState } from "react";
import { Link } from 'react-router-dom';
import GameEntry from "../models/GameEntry.model";
import Chip from './chip';

const Form = ({ entry, onSubmit }) => {
  const [tags, setTags] = useState(entry.tags);
  const [review, setReview] = useState(entry.review);
  const [tagInputText, setTagInputText] = useState('');

  // const Chip = ({children, idx}) => (
  //   <button 
  //     onClick={() => setTags([...tags.filter(t => t != idx)])}
  //     className="btn btn-primary chip"
  //   >
  //     <span>{children}</span>
  //     <span>&times;</span>
  //   </button>
  // )

  const removeTag = (idx) => setTags([...tags.filter(t => t != idx)])

  const addTags = () => {
    const newTags = tagInputText.split(',')
      .map(tag => tag.trim())
    
    setTags( Array.from(
      new Set([...tags, ...newTags])
    ))
    setTagInputText('');
  }

  const submitForm = async () => {
    await fetch(`/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(new GameEntry({
        _id: entry._id,
        game: entry.game,
        tags,
        review
      }))
    });
    onSubmit();
  }

  const deleteGame = async () => {
    await fetch(`/api/games/${entry._id}`, {
      method: 'DELETE'
    })
    onSubmit();
  }

  return (
    <>
      <div className="form-group">
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            className="form-control"
            id="review"
            rows="3"
            value={review}
            onChange={e => setReview(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <small id="tagHelp" className="form-text text-muted">Mulit-word and comma-separated tags.</small>
          <div className="input-group mb-3">
            <input  
              className="form-control"
              id="tags"
              type="text"
              value={tagInputText}
              onChange={e => setTagInputText(e.target.value)}
            />
            <div className="input-group-append">
              <button onClick={addTags} className="btn btn-outline-secondary">Add Tags</button>
            </div>  
          </div>
          <div className="input-group">
            { tags.map(
                (tag, idx) => <Chip key={tag} action={() => removeTag(idx)} isRemove={true}>{tag}</Chip>)
            }
          </div>
        </div>
        <div className="form-group">
          <button onClick={() => submitForm()} className="btn btn-primary">Submit</button>
          { 
            entry._id && 
            <button onClick={() => deleteGame()} className="btn btn-danger">Delete</button>
          }
        </div>
      </div>
    </>
  );
};

export default Form;
