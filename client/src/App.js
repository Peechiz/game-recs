import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import Browse from './pages/Browse';
import Home from './pages/Home';
import './App.css'


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/browse">
          <Browse />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;
