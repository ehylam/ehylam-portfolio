import { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import Image from './components/Image';
import ImageTransition from './lib/imageTransition';
import SmoothScroll from './lib/utils/smoothScroll';


function App() {

  useEffect(() => {
    new ImageTransition('.canvas');
    // new SmoothScroll();
  },[]);

  return (
    <main className="App">
      <section className="scroll">
        <Hero headings={['Welcome', 'こんにちは']} />
        <Image src="/images/melbourne.jpg" alt="Melboune CBD skyline" heading="Melbourne CBD Skyline" />
        <Image src="/images/osaka-castle.jpg" alt="Osaka Castle" heading="Oaska Castle" />
        <Image src="/images/japan-eki.jpg" alt="Train Station" heading="Train Station" />
        <Image src="/images/crossing.jpg" alt="Road Crossing" heading="Road Crossing" />
        <Image src="/images/jp-taxi.jpg" alt="Japan's Taxi - Shutter drag" heading="Taxi" />
        <div className="fullscreen"></div>
      </section>
      <canvas className="canvas"></canvas>
    </main>
  )
}

export default App
