import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import * as disputeActions from '../actions/dispute';

console.log(disputeActions);

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
    console.log(this.props);
    const { dispute, disputeActions } = this.props;
    return <div>
      <h1>Navbar might be here</h1>
      <Link to="/dispute">Show all disputes</Link><br/>
      <Link to="/">Create new dispute</Link>
      <div>{React.cloneElement(this.props.children, {...this.props, actions: disputeActions.fetchDispute})}</div>
    </div>
  }
};

const mapStateToProps = (state) => {
  return {
    dispute: state.dispute
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  disputeActions: bindActionCreators(disputeActions, dispatch)
 }
};

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default App;
