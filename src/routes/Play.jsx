import { useEffect } from 'react';
import { pageTransition } from '../lib/hooks/pageTransition';
import Hero from '../components/Hero';

const Play = (props) => {
  useEffect(() => {
    pageTransition(props);
  },[props.transitionState])

  return (
    <>
      <Hero headings={['Play', 'time', 'Playtime!']} copy={'<p>Testing page transitions with GSAP</p>'} />
    </>
   );
}

export default Play;