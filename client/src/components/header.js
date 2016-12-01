import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
  render(){
    return <div>
      <Link to="/dispute">Show all disputes</Link><br/>
      <Link to="/">Create new dispute</Link>
    </div>
  }
}

export default Header;
