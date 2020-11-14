import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import Chip from "../components/chip";
import SearchBar from '../components/searchBar'
import MiniDetail from "../components/miniDetail";
import { ReactComponent as ShareIcon } from 'bootstrap-icons/icons/upload.svg'
import '../assets/styles/home.css';
import copy from 'copy-to-clipboard';

const Home = ({ history }) => {
  const location = useLocation();
  const [tags, setTags] = useState();
  const [search, setSearch] = useState('')
  const [games, setGames] = useState(null);

  useEffect(() => {
   
    (async () => {
      // GET TAGS
        const foundTags = await (await fetch("/api/tags")).json();
        const params = new URLSearchParams(location.search).get('tags')
        let searchTags = [];
        if (params) {
          searchTags = params.split(',');
        }
  
        setTags(foundTags.map(tag => {
          tag.active = searchTags.includes(tag.name);
          return tag;
        }));
  
      // GET GAMES
        const foundEntries = await (await fetch("/api/games")).json()

        foundEntries.forEach(entry => {
          entry.tags = entry.tags.map(tagID => ({...foundTags.find(tag => tag._id === tagID)}))
        })

        const shuffle = (arr) => {
          for (let i = arr.length - 1; i > 0; i--) {
              let j = Math.floor(Math.random() * (i + 1));
              let temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
          }
        }
        console.log(foundEntries)
        // shuffle(foundEntries)
        setGames(foundEntries);
    })()

  }, [location.search]);

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

  const copyTagPath = () => {
    const query = new URLSearchParams()
    const activeTags = tags.filter(tag => tag.active).map(tag => tag.name)
    query.set('tags', activeTags)
    const path = `${window.location.host}?${query.toString()}`
    copy(path);
  }

  const someActiveTags = () => tags && !tags.every(t => !t.active)

  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <div className="col-md-9">
            <h1>Dude, you totally have to play...</h1>
            <SearchBar search={search} setSearch={setSearch} onSearch={null}/>

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
              <span>Share this tagset: <ShareIcon onClick={() => copyTagPath()} className="share" style={{fill: '#007bff'}} /></span>
            }
            <div className="flex d-flex flex-wrap grid">
            {
              // only games that include all active tags
              !!games && games.filter(
                entry => tags.filter(t => t.active).every(t => entry.tags.map(tag => tag.name).includes(t.name))
              ).filter(entry => entry.game.name.toLowerCase().includes(search.toLowerCase()) ).map(e => (
                <MiniDetail 
                  key={e._id}
                  entry={e}
                  click={() => history.push(`/games/${e._id}`)}
                />
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
