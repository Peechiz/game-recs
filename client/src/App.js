import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import DetailPage from './pages/DetailPage';
import Login from './pages/Login';
import './assets/styles/App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)


const App = () => {
  return (
    <Router>
      <div className="appBar">
        <ul>
          <Link to="/admin"><li>Admin</li></Link>
          <Link to="/"><li>Home</li></Link>
        </ul>
      </div>
      <Switch>
        <Route exact path="/" component={Home}/>          
        <Route path="/admin" component={Admin}/>
        <Route path="/games/:id" component={DetailPage}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  )
};

export default App;
