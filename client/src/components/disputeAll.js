import React, { Component } from 'react';
import { normalize, Schema, arrayOf } from 'normalizr';
const io = require('socket.io-client');

const dispute = new Schema('disputes', {idAttribute: '_id'});
const arrayOfDisputes = arrayOf(dispute);

class DisputeAll extends Component{
  componentDidMount(){
    const socket = io.connect('http://localhost:8080');
    socket.on('fetch', (data) => {
      data = normalize(data, arrayOfDisputes);
      console.log(data);
      this.props.disputeActions.fetchDispute(data);
    });
  }
  render() {
    return (
      <div>
        <ul>
        {
            this.props.dispute.allIds.map((t, id) => {
              const dispute = JSON.stringify(this.props.dispute.byId[t]);
              return <li key={id}>
                  <pre>{dispute}</pre>
                </li>
            })
        }
      </ul>
    </div>
  )
  }
}

export default DisputeAll;
