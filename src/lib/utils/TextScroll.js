// Rough replication of the text animation from - https://monopo.vn/
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class TextScroll {
  constructor(texts) {
    this.body = document.querySelector('body');
    this.texts = document.querySelectorAll(texts);
    this.masks = [];

    this.maskOpacity = 0.6;
    this.maskColour = '';

    this.init();
  }

  init() {
    this.setMasks();
    this.updateMaskColour();
    this.setAnimations();
    this.eventListeners();
  }

  eventListeners() {
    document.querySelector('.nav__mode .nav__mode-button').addEventListener('click', this.updateMaskColour.bind(this));
  }

  setMasks() {
    this.texts.forEach((text) => {
      const mask = document.createElement('div');
      mask.classList.add('mask');
      mask.style.backgroundColor = this.maskColour;
      console.log(this.maskColour);
      mask.style.opacity = this.maskOpacity;
      this.masks.push(mask);

      text.style.position = 'relative';
      // text.style.display = 'inline-block';

      const span = document.createElement('span');
      span.innerHTML = text.innerHTML;
      text.innerHTML = '';

      text.appendChild(span);
      text.appendChild(mask);
    });
  }


  setAnimations() {
    this.masks.forEach(mask => {
      gsap.to(mask, {
        left: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: mask,
          start: 'bottom 75%',
          scrub: 0.3
        }
      });
    })
  }

  updateMaskColour() {
    // Jank
    setTimeout(() => {
      this.maskColour = getComputedStyle(this.body).getPropertyValue('--light-color');
      this.masks.forEach(mask => {
        mask.style.backgroundColor = this.maskColour;
      })
    },1);
  }


}