import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import FeedBack from './pages/FeedBack';
// import Ranking from './pages/Ranking';
import Game from './pages/Game';
import Configuraçoes from './pages/Configuraçoes';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/feedback" component={ FeedBack } />
        {/* <Route path="/ranking" component={ Ranking } /> */}
        <Route path="/settings" component={ Configuraçoes } />
        <Route path="/game" component={ Game } />
      </Switch>
    </div>

  );
}
