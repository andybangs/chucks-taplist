import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, IndexRedirect } from 'react-router';
import App from './components/App';
import TapList from './components/TapList';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/chucks85th" />
      <Route path="/:location" component={TapList} />
    </Route>
  </Router>),
  document.getElementById('app')
);
