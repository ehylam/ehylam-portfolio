import { useState, useEffect } from 'react';
import '../lib/scss/Nav.scss';
import Play from '../routes/Play';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [theme, setTheme] = useState('light');
  const lightColour = '#f8f8f8'
  const darkColour = '#1c1c1c';

  useEffect(() => {
    // Update initial state
    if(localStorage) {
      setTheme(localStorage.getItem('theme'));
    }
  },[]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const updateTheme = () => {
    if(theme === 'dark') {
      document.documentElement.style.setProperty('--dark-color', lightColour);
      document.documentElement.style.setProperty('--light-color', darkColour);
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.style.setProperty('--dark-color', darkColour);
      document.documentElement.style.setProperty('--light-color', lightColour);
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    updateTheme();
  },[theme]);


  return (
    <nav className="nav">
      <div className="nav__links">
        <Link to="/">Home</Link>
        <Link to="/play">Play</Link>
        <Link to="/intro">Intro</Link>
      </div>
      <div className="nav__mode">
        <button className="nav__mode-button" onClick={toggleTheme}>{theme === 'dark' ? '🌑' : '🌕'}</button>
      </div>
    </nav>
   );
}

export default Nav;