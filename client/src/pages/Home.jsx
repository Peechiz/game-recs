import React, { useState, useEffect } from "react";
import Chip from "../components/chip";

const Home = () => {
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/tags");
      const json = await res.json();
      // console.log(JSON.stringify(json))
      setTags(sort(json));
    })();
  }, []);

  const sort = arr => arr.sort((a,b) => a.toUpperCase() < b.toUpperCase() ? -1 : 1);

  const addTag = tag => {
    setTags(tags.filter(t => t !== tag ));
    setActiveTags([...activeTags, tag]);
  };

  const removeTag = tag => {
    setActiveTags(activeTags.filter(t => t !== tag));
    setTags(sort([tag, ...tags]));
  }

  return (
    <div className="container">
      <div className="content">
        <div className="row">
          <div className="col-md-9">
            <h1>Dude, you totally have to play...</h1>
            <input className="form-control mb-3" type="text" />
            {activeTags &&
              activeTags.map(tag => (
                <Chip action={() => removeTag(tag)} isRemove={true}>
                  {tag}
                </Chip>
              ))}
          </div>
          <div className="col-md-3">
            <h1>tags</h1>
            {tags &&
              tags.map(tag => (
                <Chip action={() => addTag(tag)} isRemove={false}>
                  {tag}
                </Chip>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
