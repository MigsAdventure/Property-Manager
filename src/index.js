import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './socket-init';

import Layout from './components/Layout';
import OverView from './components/OverView';
import './stores/PropertyStore';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={OverView} />
      {/* <Route path='property/:id' component={property} /> */}
    </Route>
  </Router>,
  document.getElementById('root')
);
