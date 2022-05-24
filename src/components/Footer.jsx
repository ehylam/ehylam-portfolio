// Copyright and tech used to build the site (vite - React.js, Three.js, gsap, SCSS<
import '../lib/scss/Footer.scss';

const Footer = () => {
  return (
    <footer>
      <p>Built on React + Vite with a ton of GSAP, THREE.js and SCSS</p>
      <p>&copy; {new Date().getFullYear()}<a href="https://www.linkedin.com/in/eric-lam-1a7b86153/" target="_blank"> Eric Lam</a></p>
    </footer>
   );
}

export default Footer;