import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import DetailPage from './pages/DetailPage';
import './assets/styles/App.css'


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>          
        <Route path="/admin" component={Admin}/>
        <Route path="/game/:id" component={DetailPage}/>
      </Switch>
    </Router>
  )
};

export default App;
