// import { useEffect } from 'react';
import Hero from '../components/Hero';
import { useMatch } from 'react-router-dom';

const Play = () => {
  return (
    <Hero headings={['Play', 'time', 'Playtime!']} copy={'<p>Testing page transitions with GSAP</p>'} />
   );
}

export default Play;