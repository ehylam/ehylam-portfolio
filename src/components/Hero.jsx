import { useEffect } from 'react';
import gsap from 'gsap';
import '../lib/scss/Hero.scss';

const Hero = (props) => {
  const splitText = (text) => {
    return text.split('').map((word, index) => {
      return <span key={index}>{word}</span>;
    });
  }

  useEffect(() => {
    const headingParent = gsap.utils.toArray('.hero__heading-parent');

    // headingParent.forEach(function(heading, i) {
    //   const headingTexts = heading.querySelectorAll('span');
    //   const heroTl = gsap.timeline({});
    //   const delay = i * 0.75;

    //   heroTl.to(headingTexts, {
    //     y: '-100%',
    //     duration: 0.75,
    //     stagger: 0.030,
    //     delay: delay,
    //   }).to(heading, {
    //     opacity: 0,
    //     duration: 0,
    //     delay: delay + 1,
    //     onComplete: () => {
    //       document.querySelector('.hero__heading').appendChild(heading);
    //       gsap.to(headingTexts, {
    //         y: '100%',
    //         opacity: 1,
    //         duration: 0,
    //       })
    //     }
    //   });
    // });



  },[]);

  return (
    <section className="hero">
      <h1 className="hero__heading">
        {props.headings.map((word, index) => {
          return <span key={index} className="hero__heading-parent">{splitText(word)}</span>;
        })}
      </h1>
    </section>
   );
}

export default Hero;