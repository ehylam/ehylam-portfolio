import { useEffect } from 'react';
import './App.css';

import PageTransition from './components/PageTransition';
import AnimatedRoutes from './components/AnimatedRoutes';

function App() {

  return (
    <main className="App">
      <AnimatedRoutes />
      <PageTransition />
    </main>
  )
}

export default App
