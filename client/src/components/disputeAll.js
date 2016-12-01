import React, { Component } from 'react';

class DisputeAll extends Component{
  componentDidMount(){
  this.props.disputeActions.fetchDispute();
  }
  render() {
    return <div>
      <pre>
        {this.data}
      </pre>
    </div>
  }
}

export default DisputeAll;
