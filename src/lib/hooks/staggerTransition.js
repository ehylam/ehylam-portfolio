import gsap from 'gsap';

export const staggerTransition = (el, transitionState) => {
  switch (transitionState) {
    case 'play':
      gsap.to(el, {
        duration: 0.4,
        y: 0,
        stagger: 0.015
      });
      break;

    case 'reverse':
      gsap.to(el, {
        duration: 0.4,
        y: '-100%',
        stagger: 0.015
      });
      break;
  }
}