import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './header.styl';
class Header extends Component {
  render(){
    return <div className={styles.header}>
      <Link id="test" to="/dispute">Show all disputes</Link><br/>
      <Link to="/">Create new dispute</Link>
    </div>
  }
}

export default Header;
