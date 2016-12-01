import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, About, NotFound, StyleScoping, Main, Login } from './containers';

export default (
  <Route path="/" component={App}>
    { /* main route */ }
    <IndexRoute component={Main} />

    { /* routes */ }
    <Route path="about" component={About} />
    <Route path="styles" component={StyleScoping} />
    <Route path="login" component={Login} />

    { /* catch all route */ }
    <Route path="*" component={NotFound} />
  </Route>
);
