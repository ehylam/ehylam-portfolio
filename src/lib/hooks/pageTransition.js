import gsap from 'gsap';


export const pageTransition = ({transitionState, toggleTransition, toggleLocation}, delay = 0) => {
  switch (transitionState) {
    case 'enter':
      gsap.to('.page-transition', {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.9,
        ease: 'power3.inOut',
        delay: delay,
        onComplete: () => {
          document.body.style.height = `${document.querySelector('.scroll').getBoundingClientRect().height}px`;
        }
      });
      break;
    case 'exit':
      gsap.to('.page-transition', {
        scaleY: 1,
        duration: 0.9,
        transformOrigin: 'bottom',
        ease: 'power3.inOut',
        onComplete: () => {
          toggleTransition();
          toggleLocation();
        }
      });
      break;
  }

}