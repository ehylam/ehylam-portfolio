import { useEffect } from 'react';
import IntroAnimation from '../components/IntroAnimation';
import { pageTransition } from '../lib/hooks/pageTransition';

const Intro = (props) => {
  useEffect(() => {
    pageTransition(props);
  },[props.transitionState]);



  return (
    <div className="scroll">
      <IntroAnimation title="Intro" subtitle="イントロ" />
    </div>
   );
}

export default Intro;