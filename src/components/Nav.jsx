import '../lib/scss/Nav.scss';
import { useState } from 'react';

const Nav = (props) => {
  console.log(props.toggle);
  return (
    <nav className="nav">
      <div className="nav__mode">
        <button className="nav__mode-button" onClick={props.toggle.toggleDark}>{props.toggle.isDark ? '🌑' : '🌕'}</button>
      </div>
    </nav>
   );
}

export default Nav;