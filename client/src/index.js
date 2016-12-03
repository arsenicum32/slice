import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Dispute from './components/disputeCreation/dispute';
import DisputeAll from './components/allDisputes/disputeAll';
import Profile from './components/profile/profile';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={App} >
        <IndexRoute component={Dispute} />
        <Route path="/dispute" component={DisputeAll} />
        <Route path="/profile" component={Profile} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
