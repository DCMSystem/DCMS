import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Login from './components/common/Login';
import MainLayout from 'components/common/MainLayout';
import Home from 'components/common/Home';
import AS from 'components/AS/AS';
import Discount from 'components/discount/Discount';
import Estimate from 'components/estimate/Estimate';
import FTA from 'components/FTA/FTA';
import Promotion from 'components/promotion/Promotion';
import Development from 'components/development/Development';
import AdminHome from 'components/admin/AdminHome';
import Account from 'components/admin/account/Account';
import AdminMainLayout from 'components/admin/AdminLayout';
import EstimateTable from 'components/estimate/EstimateTable';
import EstimateList from 'components/estimate/EstimateList';
import Product from 'components/admin/product/Product';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={Login} />
      <MainLayout exact path='/main' component={Home} />
      <MainLayout exact path='/as' component={AS} />
      <MainLayout exact path='/discount' component={Discount} />
      <MainLayout exact path='/estimate' component={Estimate} />
      <MainLayout exact path='/estimate/table' component={EstimateTable} />
      <MainLayout exact path='/estimate/list' component={EstimateList} />
      <MainLayout exact path='/fta' component={FTA} />
      <MainLayout exact path='/promotion' component={Promotion} />
      <MainLayout exact path='/development' component={Development} />
      <AdminMainLayout exact path='/admin' component={AdminHome} />
      <AdminMainLayout exact path='/admin/account' component={Account} />
      <AdminMainLayout exact path='/admin/product' component={Product} />
    </Switch>
  );
}

export default App;
