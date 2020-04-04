import React, { useEffect, useState, useReducer } from 'react'
import useFetch from '../hooks/useFetch';
import Chip from '../components/chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Tagger = ({ show }) => {
  const [tags, setTags] = useState(null)
  const [selectedTag, setSelectedTag] = useState(null)
  const { data, isLoading, err } = useFetch('/api/tags');
  const tagMetaData = useFetch(selectedTag ? `api/tags/${selectedTag}` : null);
  // const [tagDef, setTagDef] = useState('')
  // const [tagIcon, setTagIcon] = useState('')
  const [deleteEnabled, setDeleteEnabled] = useState(false);

  const initialTagMetaState = {
    _id: null,
    name: '',
    icon: null,
    definition: ''
  };

  const tagMetaReducer = (state, action) => {

    // needs more robust set/reset switch
    return {
      _id: action._id || state._id,
      name: action.name || state.name,
      icon: action.icon !== null ? action.icon : state.icon,
      definition: action.definition || state.definition,
    }
  }

  const [tagMetaState, dispatch ] = useReducer(tagMetaReducer, initialTagMetaState);

  useEffect(() => {
    if (!!data) {
      setTags(data.map(tag => ({ name: tag, active: false })))
    }
  }, [data])

  useEffect(() => {
    // get tag data
    console.log('existing', tagMetaData)
    const { data } = tagMetaData;
    if (data) {
      dispatch({
        _id: data._id,
        name: data.name,
        icon: data.icon,
        definition: data.definition
      })
    }
  },[tagMetaData])

  const selectTag = name => {
    setTags(tags.map(tag => {
      if (name === tag.name) {
        tag.active = true
        setSelectedTag(tag.name);
      } else {
        tag.active = false
      }
      return tag
    }))
  }

  const submitTagMetadata = () => {
    fetch('/api/tags', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tagMetaState)
    })
  }

  const { icon, definition } = tagMetaState;

  return (
    <>{show &&
      <>
        <h3>All Tags</h3>
        <div className="card bg-light flex-wrap flex-row p-3">
          {tags && tags.map(tag => (
            <Chip key={tag.name}
              myClass={tag.active && 'btn-success'}
              noSpan={true}
              action={() => selectTag(tag.name)}
            >{tag.name}</Chip>
          ))}
        </div>
        {
          selectedTag &&
          <>
            <h3>{selectedTag}</h3>

            <div className="d-flex">
              <div className="card bg-light mr-3 p-2" style={{width: 70, height: 70, placeItems: 'center'}}>
                {
                  icon ?
                  <FontAwesomeIcon icon={icon} size="3x" /> :
                  <FontAwesomeIcon icon="times-circle" size="3x" />
                }
              </div>
              <div className="form-group">
                <label htmlFor="icon">Icon</label>
                <input className="form-control" id="icon" type="text"
                  value={icon || ''}
                  onChange={e => dispatch({ icon: e.target.value })}
                />
              </div>
            </div>
            <label htmlFor="tagDef">Tag Definition</label>
            <textarea rows="3"
              className="form-control mb-2"
              id="tagDef" type="text"
              value={definition}
              onChange={e => dispatch({ definition: e.target.value})}
            />
            <button onClick={submitTagMetadata} className="btn btn-primary mr-2">Submit</button>
            <button disabled={!deleteEnabled} className="btn btn-danger mr-2">Delete</button>
            <div className="form-check form-check-inline">
              <input className="form-check-input"
                type="checkbox" id="enableDelete" value={deleteEnabled}
                onChange={() => setDeleteEnabled(!deleteEnabled)}
              />
              <label className="form-check-label" htmlFor="enableDelete">enable delete?</label>
            </div>
          </>
        }
      </>
    }</>
  )
}

export default Tagger