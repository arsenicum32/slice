import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './header.styl';

class Header extends Component {
  render(){
    return <div className={styles.header}>
    <ul>
      <li><Link to="/dispute">All disputes</Link></li>
      <li><Link to="/">Create new dispute</Link></li>
      <li style={{float: "right"}}><Link to="/profile">Profile</Link></li>
    </ul>
    </div>

  }
}

export default Header;
