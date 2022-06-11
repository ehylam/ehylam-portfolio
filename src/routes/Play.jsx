import { useRef, useEffect } from 'react';
import { pageTransition } from '../lib/hooks/pageTransition';
import Hero from '../components/Hero';
import SmoothScroll from '../lib/utils/SmoothScroll';
import AnimationTest from '../lib/utils/AnimationTest';

const Play = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    pageTransition(props);
  },[props.transitionState]);

  useEffect(() => {
    const smoothScroll = new SmoothScroll();
    const animationTest = new AnimationTest(canvasRef.current);

    smoothScroll.render();
  },[]);

  return (
    <div className="scroll">
      <Hero headings={['Play', 'time', 'Playtime!']} copy={'<p>Testing page transitions with GSAP</p>'} />
      <canvas ref={canvasRef} className="canvas canvas--block"></canvas>
    </div>
   );
}

export default Play;