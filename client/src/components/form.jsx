import React, { useState, useEffect } from "react";
import GameEntry from "../models/GameEntry.model";
import Chip from "./chip";
import useFetch from '../hooks/useFetch';
import YouTubeEmbed from './youtubeEmbed';

const Form = ({ entry, onSubmit }) => {
  const [tags, setTags] = useState([]);
  const [review, setReview] = useState(entry.review);
  const [tagInputText, setTagInputText] = useState("");
  const [precision, setPrecision] = useState(entry.precision || 3);
  const [whyPlay, setWhyPlay] = useState(entry.why);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const [gameVideos, setGameVideos] = useState(entry.videos);

  const {
    data: videos,
    isLoading: isLoadingVideos,
    err: errLoadingVideos
  } = useFetch(`/api/video/${entry.game.id}`);

  useEffect(() => {
    if (!!videos) {
      setGameVideos(gameVideos => [...gameVideos, ...videos.filter(v => !gameVideos.map(v => v.video_id).includes(v.video_id)) ])
    }
  }, [videos])

  useEffect(() => {
    (async () => {
      const foundExistingTags = await(await fetch("/api/tags")).json();
      setTags(foundExistingTags.map(tag => {
        tag.active = entry.tags.includes(tag._id);
        return tag 
      }));
    })()
    setGameVideos(gameVideos => [...gameVideos.map(v => { v.active = true; return v })])
  }, [entry.tags]);


  const removeTag = tag => {
    if (!!tag._id) {
      setTags([...tags.map(t => {
        if (t._id === tag._id) {
          t.active = false
        }
        return t
      })])
    } else {
      setTags([...tags.filter(t => t.name !== tag.name)])
    }
  }

  const addTag = tagName => {
    setTags([...tags.map(tag => {
      if (tag.name === tagName) {
        tag.active = true;
      }
      return tag
    })])
  };

  const addTags = () => {
    const newTags = tagInputText.split(",").map(tag => tag.trim());
    setTags([...tags, ...newTags.map(tagName => ({ name: tagName, active: true }))])
    setTagInputText("");
  };
  
  const tagSort = (a, b) =>
    a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;

  const toggleSelectVideo = video_id => {
    setGameVideos([...gameVideos.map(v => {
      if (v.video_id === video_id) {
        v.active = !v.active
      }
      return v
    })])
  }

  const submitForm = async () => {
    const newEntry = new GameEntry({
      _id: entry._id,
      game: entry.game,
      why: whyPlay,
      videos: gameVideos.filter(v => v.active).map(v => ({ name: v.name, video_id: v.video_id })),
      tags: tags.filter(t => t.active).map(tag => !!tag._id ? tag._id : tag),
      review,
      precision,
    })
    await fetch(`/api/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEntry)
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
              {tags.filter(tag => tag.active).map(tag => (
                <Chip key={tag.name} action={() => removeTag(tag)} isRemove={true}>
                  {tag.name}
                </Chip>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="videos">Videos</label>
            <div className="d-flex flex-wrap">
              {
                isLoadingVideos && <span>Loading...</span>
              }
              {
                gameVideos && <>
                  { gameVideos.map(v => (
                    <div key={v.video_id} className="mr-3">
                      <div className="border border-dark d-flex align-items-center">
                        <input type="checkbox"className="mx-2"
                          checked={
                            !!gameVideos.find(vid => v.video_id === vid.video_id).active
                          }
                          onChange={() => toggleSelectVideo(v.video_id)}
                        />
                        <YouTubeEmbed id={v.video_id}
                          styles={{ borderLeft: '1px solid black'}}/>
                      </div>
                      <p className="font-weight-light">{v.name}</p>
                    </div>
                  ))}
                </>
              }
              {
                errLoadingVideos && <p>Couldn't find any videos...</p>
              }
            </div>
          </div>

          {/* ACTIONS */}
          <div className="form-group">
            <button onClick={() => submitForm()} className="btn btn-primary">
              Submit
            </button>
            {entry._id &&
              <>
                <button
                  disabled={!deleteEnabled}
                  onClick={() => deleteGame()}
                  className="btn btn-danger mx-2"
                >
                  Delete
                </button>
                <div className="form-check form-check-inline">
                  <input className="form-check-input"
                    type="checkbox" id="enableDelete" value={deleteEnabled}
                    onChange={() => setDeleteEnabled(!deleteEnabled)}
                  />
                  <label className="form-check-label" htmlFor="enableDelete">enable delete?</label>
                </div>
              </>
            }
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <h1>tags</h1>
        {// inactive tags
          tags &&
          tags
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
