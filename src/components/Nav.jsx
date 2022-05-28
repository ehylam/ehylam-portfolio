import '../lib/scss/Nav.scss';

const Nav = (props) => {
  return (
    <nav className="nav">
      <div className="nav__mode">
        <button className="nav__mode-button" onClick={props.toggle.toggleTheme}>{props.toggle.theme === 'dark' ? '🌑' : '🌕'}</button>
      </div>
    </nav>
   );
}

export default Nav;