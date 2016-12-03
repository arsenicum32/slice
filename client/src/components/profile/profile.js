import React, { Component } from 'react';
import { normalize, Schema, arrayOf } from 'normalizr';
const io = require('socket.io-client');

import styles from './profile.styl';

class Profile extends Component{

  componentDidMount(){
  }

  render() {
    return (
      <div className={styles.row}>
        <div className={styles.FUCK}>Not implemented</div>
      </div>
  )
  }
}

export default Profile;
