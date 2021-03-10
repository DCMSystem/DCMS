import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './components/common/Login';
import MainLayout from 'components/common/MainLayout';
import Home from 'components/common/Home';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <MainLayout exact path="/main" component={Home} />
    </Switch>
  );
}

export default App;
