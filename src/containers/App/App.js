import React from 'react';

const App = (props) => (
  <section id="application">
    {props.children}
  </section>
);

App.propTypes = {
  children: React.PropTypes.node
};

export default App;
