import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dispute from '../components/dispute'
import axios from 'axios';
import { Link } from 'react-router';

class App extends Component {
  handleSubmit(data){
    axios.post('/dispute/add', data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  render() {
    return <div>
      <h1>Navbar might be here</h1>
      <Link to="/dispute">Show all disputes</Link><br/>
      <Link to="/">Create new dispute</Link>
      {this.props.children}
    </div>
  }
};

export default App;
