import React, { useEffect, useState, useReducer } from 'react'
import useFetch from '../hooks/useFetch';
import Chip from '../components/chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Tagger = ({ show }) => {
  const [tags, setTags] = useState(null)
  const { data, isLoading, err, refetch } = useFetch('/api/tags');
  const [deleteEnabled, setDeleteEnabled] = useState(false);

  const initialSelectedTagState = {
    _id: null,
    name: '',
    icon: null,
    definition: ''
  };

  const selectedTagReducer = (state, action) => {
    switch (action.type) {
      case 'set':
        return {
          _id: action._id || state._id,
          name: action.name || state.name,
          icon: typeof action.icon === 'string' ? action.icon : state.icon,
          definition: typeof action.definition === 'string' ? action.definition : state.definition,
        }
      case 'select':
        const selected = tags.find(tag => tag._id === action._id);
        return {
          _id: selected._id,
          name: selected.name,
          icon: selected.icon || '',
          definition: selected.definition || ''
        }
      case 'reset':
        return initialSelectedTagState;
      default:
        return state;
    }
  }

  const [selectedTagState, dispatch ] = useReducer(selectedTagReducer, initialSelectedTagState);

  useEffect(() => {
    if (!!data) {
      setTags(data.map(tag => { tag.active = false; return tag }))
    }
  }, [data])

  const selectTag = t => {
    setTags(tags.map(tag => {
      if (t.name === tag.name) {
        tag.active = true
        dispatch({ type: 'select', _id: tag._id });
      } else {
        tag.active = false
      }
      return tag
    }))
  }

  const resetTags = () => {
    dispatch({ type: 'reset' });
    refetch()
  }

  const submitTag = () => {
    fetch(`/api/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(selectedTagState)
    }).then(() => resetTags())
    .catch(err => console.log(err))
  }

  const { icon, definition, name } = selectedTagState;

  return (
    <>{show &&
      <>
        <h3>All Tags</h3>
        <div className="card bg-light flex-wrap flex-row p-3">
          {tags && tags.map(tag => (
            <Chip key={tag.name}
              myClass={`${tag.active ? 'btn-success' : 'btn-primary'} ${!tag.active && !!!tag.icon ? 'grey' : ''}`}
              noSpan={true}
              action={() => selectTag(tag)}
            >{tag.name}</Chip>
          ))}
          {
            isLoading && <p>Loading tags...</p>
          }
          {
            err && <p>Failed to fetch tags.</p>
          }
        </div>
        {
          !!name &&
          <>
            <h3>{name}</h3>

            <div className="d-flex">
              <div className="card bg-light mr-3 p-2" style={{width: 70, height: 70, placeItems: 'center'}}>
                {
                  icon ?
                  <FontAwesomeIcon icon={icon} size="3x" /> :
                  <FontAwesomeIcon icon="times-circle" size="3x" />
                }
              </div>
              <div className="form-group">
                <label htmlFor="icon">FontAwesome Icon</label>
                <input className="form-control" id="icon" type="text"
                  value={icon || ''}
                  onChange={e => dispatch({ type: 'set', icon: e.target.value })}
                />
              </div>
            </div>
            <label htmlFor="tagDef">Tag Definition</label>
            <textarea rows="3"
              className="form-control mb-2"
              id="tagDef" type="text"
              value={definition}
              onChange={e => dispatch({ type: 'set', definition: e.target.value})}
            />
            <button onClick={submitTag} className="btn btn-primary mr-2">Submit</button>
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