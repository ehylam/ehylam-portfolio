import { useEffect } from 'react';
import { handleTransition } from '../lib/hooks/handleTransition';
import Hero from '../components/Hero';

const Play = (props) => {
  useEffect(() => {
    handleTransition(props);
  },[props.transitionState])

  return (
    <>
      <Hero headings={['Play', 'time', 'Playtime!']} copy={'<p>Testing page transitions with GSAP</p>'} />
    </>
   );
}

export default Play;