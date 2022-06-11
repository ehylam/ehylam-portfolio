import { useEffect } from 'react';
import Hero from '../components/Hero';
import Image from '../components/Image';
import Footer from '../components/Footer';
import ImageTransition from '../lib/utils/ImageTransition';
import { pageTransition } from '../lib/hooks/pageTransition';

const Home = (props) => {
  useEffect(() => {
    new ImageTransition('.canvas');
  },[]);

  useEffect(() => {
    pageTransition(props, 0.25);
  },[props.transitionState])

  return (
    <main className="home">
      <div className="scroll">
        <Hero headings={['Välkommen', 'ようこそ', ' Welcome']} copy={"<p>Hey welcome to my portfolio, a portfolio to showcase my photographs and web dev skills! Two in one.</p><p>Currently working as a Front-end Developer @ <a href='https://chriate.com.au/' target='_blank'>Chriate</a> in Melbourne, Australia.</section></p><p>Born in a lovely coastal city called <a href='https://www.visitwollongong.com.au/'>Wollongong</a> in NSW, Australia 🌅 (please do visit!).</p>"} />
        <Image src="/images/melbourne.jpg" alt="Melboune CBD skyline" heading="Melbourne CBD Skyline" />
        <Image src="/images/osaka-castle.jpg" alt="Osaka Castle" heading="Oaska Castle" />
        <Image src="/images/monkey.jpg" alt="Monkey" heading="Monkey" />
        <Image src="/images/train-conductor.jpg" alt="Station Staff" heading="Station Staff" />
        <Image src="/images/jp-taxi.jpg" alt="Japan's Taxi - Shutter drag" heading="Taxi" />
        <Image src="/images/night-ride.jpg" alt="Night Ride" heading="Night Ride" />
        <div className="fullscreen"></div>
        <Footer />
      </div>
    <canvas className="canvas"></canvas>
  </main>
   );
}

export default Home;