import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import App from '../App';
import Play from '../routes/Play';

const AnimatedRoutes = () => {
  const location = useLocation();
  const [currentLocation, setCurrentLocation] = useState(location);
  const [transitionState, setTransitionState] = useState('enter');

  useEffect(() => {
    if(location !== currentLocation) setTransitionState('exit');
  },[location, currentLocation]);



  return (
    <Routes location={currentLocation}>
      <Route path="/" element={<App />} />
      <Route path="play" element={<Play />} />
    </Routes>
   );
}

export default AnimatedRoutes;