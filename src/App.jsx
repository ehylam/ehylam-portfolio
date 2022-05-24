import { useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import Image from './components/Image';
import ImageTransition from './lib/utils/imageTransition.js';
import Footer from './components/Footer';


function App() {

  useEffect(() => {
    new ImageTransition('.canvas');
  },[]);

  return (
    <main className="App">
      <div className="scroll">
        <Hero headings={['Välkommen', 'ようこそ', ' Welcome']} copy={"<p>Hey welcome to my portfolio, a portfolio to showcase my photographs and web dev skills! Two in one.</p><p>Currently work as a Front-end Developer @ <a href='https://chriate.com.au/' target='_blank'>Chriate</a> in Melbourne, Australia.</section></p><p>Born in a lovely coastal city called <a href='https://www.visitwollongong.com.au/'>Wollongong</a> in NSW, Australia 🌅 (please do check that place out!).</p>"} />
        <Image src="/images/melbourne.jpg" alt="Melboune CBD skyline" heading="Melbourne CBD Skyline" />
        <Image src="/images/osaka-castle.jpg" alt="Osaka Castle" heading="Oaska Castle" />
        <Image src="/images/japan-eki.jpg" alt="Train Station" heading="Train Station" />
        <Image src="/images/crossing.jpg" alt="Road Crossing" heading="Road Crossing" />
        <Image src="/images/jp-taxi.jpg" alt="Japan's Taxi - Shutter drag" heading="Taxi" />
        <div className="fullscreen"></div>
        <Footer />
      </div>
      <canvas className="canvas"></canvas>
    </main>
  )
}

export default App
