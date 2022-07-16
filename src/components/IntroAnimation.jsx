import gsap from 'gsap';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../lib/scss/IntroAnimation.scss';

const IntroAnimation = ({ title, subtitle }) => {
  const splitText = (text) => {
    return text.split('').map((word, index) => {
      return <span key={index} className="t"><span>{word}</span></span>;
    });
  }
  useEffect(() => {
    const tl = gsap.timeline({paused: true});
    tl.to('.intro_animation__arrow', {
      left: '0%',
      duration: 1.5,
      ease: 'power2.inOut'
    }).to('.intro_animation__headings h1 span.t', {
      opacity: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power2.in'
    }).to('.intro_animation__headings h3 span.t', {
      opacity: 1,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power2.in'
    },'<').to('.intro_animation__arrow-title', {
      opacity: 1,
      duration: 0.9,
      ease: 'power2.in'
    },'<+=0.35').to('.intro_animation__links a', {
      opacity: 1,
      duration: 0.6,
      stagger: 0.6,
      ease: 'power2.in'
    });

    setTimeout(() => {
      tl.play();
    }, 1000);
  },[]);
  return (
    <section className="intro_animation">
      <div className="intro_animation__headings">
        <h1 className="intro_animation__headings-title">
          {splitText(title)}
        </h1>
        <h3 className="intro_animation__headings-subtitle">
          {splitText(subtitle)}
        </h3>
      </div>
      <div className="intro_animation__arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 102">
          <path id="Polygon_1" data-name="Polygon 1" d="M51,0l51,88H0Z" transform="translate(0 102) rotate(-90)" fill="#2a7806"/>
        </svg>

        <h5 className="intro_animation__arrow-title">{title}</h5>

        <div className="intro_animation__links">
          <Link to="/"><span>家</span><span>Home</span></Link>
          <Link to="/galaxy">銀河系<span>Galaxy</span></Link>
        </div>

      </div>
    </section>

   );
}

export default IntroAnimation;