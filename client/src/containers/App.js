import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import * as disputeActions from '../actions/dispute';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';

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
    const { dispute, disputeActions } = this.props;
    return <div>
      < Header />
      <div>{React.cloneElement(this.props.children, {...this.props, actions: disputeActions.fetchDispute, dispute: dispute, onSubmit: this.handleSubmit})}</div>
      < Footer />
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
