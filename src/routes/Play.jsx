import { useRef, useEffect, useState } from 'react';
import { pageTransition } from '../lib/hooks/pageTransition';
import Hero from '../components/Hero';
import TextContent from '../components/TextContent';
import SmoothScroll from '../lib/utils/SmoothScroll';
import AnimationTest from '../lib/utils/AnimationTest';

const Play = (props) => {
  const canvasRef = useRef(null);
  const [colourOne, setColourOne] = useState([120, 158, 113]);
  const [colourTwo, setColourTwo] = useState([224, 148, 66]);
  const [accent, setAccent] = useState([0, 0, 0]);

  useEffect(() => {
    pageTransition(props);
  },[props.transitionState]);

  useEffect(() => {
    const smoothScroll = new SmoothScroll();
    smoothScroll.render();
  },[]);

  useEffect(() => {
    const animationTest = new AnimationTest(canvasRef.current, colourOne, colourTwo, accent);
  },[colourOne, colourTwo, accent])

  return (
    <div className="scroll">
      <Hero headings={['Play', 'time', 'Playtime!']} copy={'<p>Testing page transitions with GSAP</p>'} />
      <TextContent />

      <section className="sliders">
        <div className="slider">
          <div className="slider__label">
            <span>Colour One (RGB)</span>
          </div>
          <div className="slider__wrapper">
            <input type="range" min="0" max="255" value={colourOne[0]} onChange={(e) => setColourOne([e.target.value, colourOne[1], colourOne[2]])} />
            <input type="range" min="0" max="255" value={colourOne[1]} onChange={(e) => setColourOne([colourOne[0], e.target.value, colourOne[2]])} />
            <input type="range" min="0" max="255" value={colourOne[2]} onChange={(e) => setColourOne([colourOne[0], colourOne[1], e.target.value])} />
          </div>
        </div>
        <div className="slider">
          <div className="slider__label">
            <span>Colour Two (RGB)</span>
          </div>
          <div className="slider__wrapper">
            <input type="range" min="0" max="255" value={colourTwo[0]} onChange={(e) => setColourTwo([e.target.value, colourTwo[1], colourTwo[2]])} />
            <input type="range" min="0" max="255" value={colourTwo[1]} onChange={(e) => setColourTwo([colourTwo[0], e.target.value, colourTwo[2]])} />
            <input type="range" min="0" max="255" value={colourTwo[2]} onChange={(e) => setColourTwo([colourTwo[0], colourTwo[1], e.target.value])} />
          </div>
        </div>
        <div className="slider">
          <div className="slider__label">
            <span>Accent (RGB)</span>
          </div>
          <div className="slider__wrapper">
            <input type="range" min="0" max="255" value={accent[0]} onChange={(e) => setAccent([e.target.value, accent[1], accent[2]])} />
            <input type="range" min="0" max="255" value={accent[1]} onChange={(e) => setAccent([accent[0], e.target.value, accent[2]])} />
            <input type="range" min="0" max="255" value={accent[2]} onChange={(e) => setAccent([accent[0], accent[1], e.target.value])} />
          </div>
        </div>
      </section>

      <canvas ref={canvasRef} className="canvas canvas--block"></canvas>
    </div>
   );
}

export default Play;