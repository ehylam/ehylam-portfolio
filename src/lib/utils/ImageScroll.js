import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class ImageScroll {
  constructor(image) {
    this.imageBlock = image;
    this.heading = this.imageBlock.querySelector('.image_block__heading span');
    this.cover = this.imageBlock.querySelector('.image_block__cover');
    this.image = this.imageBlock.querySelector('.image_block img');
    this.bg = this.imageBlock.querySelector('.image_block__bg');

    gsap.registerPlugin(ScrollTrigger);
    window.addEventListener('load', this.onReady.bind(this));
  }

  onReady() {
    let imageTl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: this.imageBlock,
        start: "40% 50%",
        end: "bottom bottom",
      }
    });

    imageTl.to(this.heading, {
      y: 0,
      ease: "power3.out",
      duration: 0.75,
    }).to(this.cover, {
      '--g-pos-1': '0%',
      '--g-pos-2': '0%',
      '--g-pos-3': '100%',
      '--g-pos-4': '100%',
      duration: 0.4,
    },0).to(this.cover, {
      scaleX: 0,
      duration: 0.5,
      ease: "power5.inOut"
    },0.7).to(this.bg, {
      scale: 1,
      duration: 0.5,
      ease: "power5.inOut"
    },0.7);
  }

}