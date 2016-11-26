import React, { Component } from 'react';

class DisputeAll extends Component{
  render() {
    let data = this.props.route.data
    data = JSON.stringify(data);
    console.log(data);
    return <div>
      <pre>
        {data}
      </pre>
    </div>
  }
}

export default DisputeAll;
