import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { staggerTransition } from '../hooks/staggerTransition';

export default class ImageScroll {
  constructor(images) {
    this.images = images;
    this.currentImage = this.images[0].img;
    this.nextImage = this.images[1].img;
    gsap.registerPlugin(ScrollTrigger);
    this.onReady();

  }

  onReady() {
    this.images.forEach(({ img, mesh }, i) => {
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

      imageTl.to(cover, {
        '--g-pos-1': '0%',
        '--g-pos-2': '0%',
        '--g-pos-3': '100%',
        '--g-pos-4': '100%',
        duration: 0.4,
        onComplete: function() {
          staggerTransition(spans, 'play');
          mesh.visible = true;
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