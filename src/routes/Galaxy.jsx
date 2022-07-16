import { useEffect } from 'react';
import GalaxyAnimation from '../lib/utils/GalaxyAnimation';
import { pageTransition } from '../lib/hooks/pageTransition';

const Intro = (props) => {
  useEffect(() => {
    pageTransition(props);

    new GalaxyAnimation(document.querySelector('canvas.galaxy'));
  },[props.transitionState]);


  return (
    <div className="scroll">
      <canvas className="galaxy"></canvas>
    </div>
   );
}

export default Intro;