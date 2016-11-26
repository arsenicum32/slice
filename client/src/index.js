import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.js';
import configureStore from './store/configureStore';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Dispute from './components/dispute';
import DisputeAll from './components/disputeAll';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={App} >
        <IndexRoute component={Dispute} />
        <Route path="/dispute" component={DisputeAll} data={{username: "admin"}} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)
