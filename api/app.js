import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import UserReviews from './components/UserReviews';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />