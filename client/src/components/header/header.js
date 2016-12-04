import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './header.styl';

class Header extends Component {
  render(){
    return <header className={styles.header}>
      <div className={styles.logo}>s / <b>i</b> c e</div>
      <div className={styles.menu}>
        <Link to="/dispute" className={styles.sm} >All disputes</Link>
        <Link to="/" className={styles.sm} >Create new dispute</Link>
        <Link to="/profile" className={styles.im}>Я</Link>
      </div>
    </header>

  }
}

export default Header;
