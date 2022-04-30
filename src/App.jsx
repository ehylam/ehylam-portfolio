import { useEffect } from 'react';
import './App.css';
import Image from './components/Image';
import ImageTransition from './lib/ImageTransition'

function App() {

  useEffect(() => {
    new ImageTransition('.canvas');
  },[]);

  return (
    <main className="App">
      <Image src="/images/pic1.jpeg" alt="Hello"/>
      <Image src="/images/pic2.jpeg" alt="Hello"/>
      <Image src="/images/pic3.jpeg" alt="Hello"/>

      <canvas className="canvas"></canvas>
      <div className="fullscreen"></div>
    </main>
  )
}

export default App
