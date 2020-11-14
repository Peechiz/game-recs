import React, { useState, useEffect } from "react";
import GameEntry from "../models/GameEntry.model";
import Chip from "./chip";
import useFetch from '../hooks/useFetch';
import YouTubeEmbed from './youtubeEmbed';

const Form = ({ entry, onSubmit }) => {
  const [tags, setTags] = useState(entry.tags);
  const [existingTags, setExistingTags] = useState([]);
  const [review, setReview] = useState(entry.review);
  const [tagInputText, setTagInputText] = useState("");
  const [precision, setPrecision] = useState(entry.precision || 3);
  const [whyPlay, setWhyPlay] = useState(entry.why);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState(entry.videos);

  const {
    data: videos,
    isLoading: isLoadingVideos,
    err: errLoadingVideos
  } = useFetch(`/api/video/${entry.game.id}`);

  useEffect(() => {
    (async () => {
      const foundExistingTags = await(await fetch("/api/tags")).json();
      setExistingTags(foundExistingTags.map(tag => {
        tag.active = tags.map(t => t.name).includes(tag.name);
        return tag 
      }));
      console.log('found', foundExistingTags)
    })()
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

  const toggleIncludeVideo = (vid) => {
    console.log(selectedVideos)
    if (selectedVideos.map(v => v.video_id).includes(vid.video_id)){
      setSelectedVideos(selectedVideos.filter(v => v.video_id !== vid.video_id))
    } else {
      setSelectedVideos([...selectedVideos, vid])
    }
  }

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
          videos: selectedVideos.map(v => ({ name: v.name, video_id: v.video_id })),
          tags: tags.map(
            tagName => existingTags.map(t => t.name).includes(tagName) ?
              existingTags.find(tag => tag.name === tagName)._id :
              { name: tagName }
          ),
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

          <div className="form-group">
            <label htmlFor="videos">Videos</label>
            <div className="d-flex">
              {
                isLoadingVideos && <span>Loading...</span>
              }
              {
                videos && <>
                  { videos.map(v => (
                    <div key={v.video_id} className="mr-3">
                      <div className="border border-dark d-flex align-items-center">
                        <input type="checkbox"className="mx-2"
                          value={
                            selectedVideos.map(vid => vid.video_id).includes(v.video_id)
                          }
                          onChange={() => toggleIncludeVideo(v)}
                        />
                        <YouTubeEmbed id={v.video_id}
                          styles={{ borderLeft: '1px solid black'}}/>
                      </div>
                        <p className="font-weight-light">{v.name}</p>
                    </div>
                  ))}
                </>
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
          existingTags &&
          existingTags
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
