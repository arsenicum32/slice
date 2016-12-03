import React, { Component } from 'react';
import { normalize, Schema, arrayOf } from 'normalizr';
const io = require('socket.io-client');

import styles from './disputeAll.styl';
const dispute = new Schema('disputes', {idAttribute: '_id'});
const arrayOfDisputes = arrayOf(dispute);

class DisputeAll extends Component{
  componentDidMount(){
    const socket = io.connect('http://localhost:1337');
    socket.on('fetch', (data) => {
      data = normalize(data, arrayOfDisputes);
      console.log(data);
      this.props.disputeActions.fetchDispute(data);
    });
  }
  render() {
    console.log(this.props.dispute);
    return (
      <div className={styles.row}>
        <ul>
        {
            this.props.dispute.allIds.map((t, id) => {
              let result = JSON.stringify(this.props.dispute.byId[t]);
              return <li key={id}><pre>{result}</pre></li>
            })
        }
      </ul>
    </div>
  )
  }
}

export default DisputeAll;
