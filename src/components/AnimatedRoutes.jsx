import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../routes/Home';
import Play from '../routes/Play';
import Intro from '../routes/Intro';

const AnimatedRoutes = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location);
  const [transitionState, setTransitionState] = useState('enter');

  useEffect(() => {
    if(location !== currentLocation) setTransitionState('exit');
  },[location, currentLocation]);

  const toggleTransition = () => {
    setTransitionState(transitionState === 'enter' ? 'exit' : 'enter');
  }

  const toggleLocation = () => {
    setCurrentLocation(location);
  }

  return (
    <Routes location={currentLocation}>
      <Route path="/" element={<Home transitionState={transitionState} toggleTransition={toggleTransition} toggleLocation={toggleLocation} />} />
      <Route path="play" element={<Play transitionState={transitionState} toggleTransition={toggleTransition} toggleLocation={toggleLocation} />} />
      <Route path="intro" element={<Intro transitionState={transitionState} toggleTransition={toggleTransition} toggleLocation={toggleLocation} />} />
    </Routes>
   );
}

export default AnimatedRoutes;