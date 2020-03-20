import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import Chip from "../components/chip";
import SearchBar from '../components/searchBar'
import MiniDetail from "../components/miniDetail";
import { ReactComponent as ShareIcon } from 'bootstrap-icons/icons/upload.svg'
import '../assets/styles/home.css';

const Home = () => {
  const location = useLocation();
  const [tags, setTags] = useState();
  const [search, setSearch] = useState('')
  const [games, setGames] = useState([]);

  
  useEffect(() => {
    (async () => {
      await fetchTags();
      await fetchAllGames();
    })()
  }, []);

  const fetchTags = async () => {
    const res = await fetch("/api/tags");
    const json = await res.json();
    const params = new URLSearchParams(location.search).get('tags')
    let searchTags = [];
    if (params) {
      searchTags = params.split(',');
    }
    setTags(json.map(tag => ({ name: tag, active: searchTags.includes(tag) })));
  }

  const fetchAllGames = async () => {
    const res = await fetch("/api/games");
    const json = await res.json();
    setGames(json);
  }

  const tagSort = (a,b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;

  const addTag = tag => {
    setTags(tags.map(t => {
      if (t.name === tag.name){
        t.active = true;
      }
      return t
    }));
  };

  const removeTag = tag => {
    setTags(tags.map(t => {
      if (t.name === tag.name){
        t.active = false;
      }
      return t
    }));
  }

  const removeAllTags = () => {
    setTags(tags.map(tag => {
      tag.active = false;
      return tag;
    }))
  }

  const someActiveTags = () => tags && !tags.every(t => !t.active)

  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <div className="col-md-9">
            <h1>Dude, you totally have to play...</h1>
            <SearchBar search={search} setSearch={setSearch} onSearch={() => {}}/>

            { // active tags
              tags &&
              <p>
                { tags.filter(t => t.active).map(tag => (
                  <Chip key={tag.name} action={() => removeTag(tag)} isRemove={true}>
                    {tag.name}
                  </Chip>
                ))}
                { someActiveTags() &&
                  <Chip isRemove={true}
                    myStyle={{ backgroundColor: '#dc3545', borderColor: '#dc3545'}}
                    action={() => removeAllTags()}
                  >Reset Tags</Chip>}
              </p>
            }
            {  someActiveTags() &&
              <span>Share this tagset: <ShareIcon className="share" style={{fill: '#007bff'}} /></span>
            }
            <div className="flex d-flex flex-wrap grid">
            {
              // only games that include all active tags
              !!games.length && games.filter(
                entry => tags.filter(t => t.active).every(t => entry.tags.includes(t.name))
              ).map(e => (
                <MiniDetail key={e.game.id} entry={e}/>
              ))
            }
            </div>
          </div>
          <div className="col-md-3">
            <h1>tags</h1>
            { // inactive tags
              tags &&
              tags.sort(tagSort).filter(tag => !tag.active).map(tag => (
                <Chip key={tag.name} action={() => addTag(tag)} isRemove={false}>
                  {tag.name}
                </Chip>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
