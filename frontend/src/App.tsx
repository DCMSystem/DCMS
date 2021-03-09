import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './components/common/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
