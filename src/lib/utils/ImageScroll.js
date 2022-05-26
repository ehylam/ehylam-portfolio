import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default class ImageScroll {
  constructor(images) {
    this.images = images;
    this.currentImage = this.images[0];
    this.nextImage = this.images[1];
    gsap.registerPlugin(ScrollTrigger);
    this.onReady();
  }

  onReady() {
    this.images.forEach((img, i) => {
      const imageBlock = img.parentElement.parentElement.parentElement;
      const spans = imageBlock.querySelectorAll('.image_block__heading span.t span');
      const cover = imageBlock.querySelector('.image_block__cover');
      const bg = imageBlock.querySelector('.image_block__bg');

      const imageTl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: imageBlock,
          start: "50% 70%",
          end: "bottom bottom",
          onUpdate: () => {
            this.currentImage = imageBlock;
            this.nextImage = this.images[i + 1];
          }
        }
      });

      const spanTl = gsap.timeline({ paused: true });

      spanTl.to(spans, {
        duration: 0.4,
        y: 0,
        stagger: 0.015
      });

      imageTl.to(cover, {
        '--g-pos-1': '0%',
        '--g-pos-2': '0%',
        '--g-pos-3': '100%',
        '--g-pos-4': '100%',
        duration: 0.4,
        onComplete: function() {
          spanTl.play();
        }
      }).to(cover, {
        scaleX: 0,
        duration: 0.5,
        ease: "power5.inOut"
      },0.7).to(bg, {
        scale: 1,
        duration: 0.5,
        ease: "power5.inOut",
      },0.7).to(bg, {
        opacity: 0,
        duration: 0.15,
        ease: "power5.inOut",
        onComplete: () => {
          bg.style.display = 'none';
        }
      });
    });
  }

}