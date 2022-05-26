import { useEffect } from 'react';
import gsap from 'gsap';
import '../lib/scss/Hero.scss';

const Hero = (props) => {
  const splitText = (text) => {
    return text.split('').map((word, index) => {
      return <span key={index} className="t"><span>{word}</span></span>;
    });
  }

  function heroHeadingAnimation() {
    const headingTl = gsap.timeline({
      onComplete: () => {
        document.querySelector('.hero__copy').classList.add('visible');
      }
    });

    headingTl.to('.hero__heading .hero__heading-parent:first-child .t span', {
      x: 0,
      duration: 0.08,
    }).to('.hero__heading .hero__heading-parent:first-child .t span', {
      x: '-110%',
      duration: 0.08,
    },'+=0.8').to('.hero__heading .hero__heading-parent:nth-child(2) .t span', {
      x: 0,
      duration: 0.08,
    }).to('.hero__heading .hero__heading-parent:nth-child(2) .t span', {
      x: '110%',
      duration: 0.08,
      delay: 1
    }).to('.hero__heading .hero__heading-parent:last-child .t span', {
      x: '0',
      duration: 0.08,
    });
  }


  useEffect(() => {
    setTimeout(() => { // Jank
      heroHeadingAnimation();
    },1000);
  },[]);

  return (
    <section className="hero">
      <h1 className="hero__heading">
        {props.headings.map((word, index) => {
          return <span key={index} className="hero__heading-parent">{splitText(word)}</span>;
        })}
      </h1>

      <div className="hero__copy">
        <div dangerouslySetInnerHTML={{__html: props.copy}} />
      </div>
    </section>
   );
}

export default Hero;