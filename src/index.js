import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './socket-init';

import Layout from './components/Layout';
import OverView from './components/OverView';
import InputForm from './components/InputForm';
import ClientsOverView from './components/ClientsOverView';
import './stores/PropertyStore';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={OverView} />
      <Route path='/form' component={InputForm} />
      <Route path='/clients' component={ClientsOverView} />
    </Route>
  </Router>,
  document.getElementById('root')
);
