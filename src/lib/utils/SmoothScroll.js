// Linear interpolation function

// lerp(10, 20, 0.5) // 15
// where t min/max = 0 to 1
function lerp(start, end, t) {
  return start * (1 - t) + end * t; // 10 * (1 - 0.5) + 20 * 0.5  --> 10 * 0.5 + 20 * 0.5 -> 5 + 10
}

export default class SmoothScroll {
  constructor() {
    this.scrollable = document.querySelector('section.scroll');
    this.currentScroll = 0;
    this.scrollTarget = 0;
    this.ease = 0.075;

    this.eventListeners();
    requestAnimationFrame(() => this.render());

  }

  eventListeners() {
    window.addEventListener('load', () => {
      document.body.style.height = `${this.scrollable.getBoundingClientRect().height}px`;
    });

    window.addEventListener('resize', () => {
      document.body.style.height = `${this.scrollable.getBoundingClientRect().height}px`;
    });

  }

  smoothScroll() {
    this.scrollTarget = window.scrollY;
    this.currentScroll = lerp(this.currentScroll, this.scrollTarget, this.ease);
    this.scrollable.style.transform = `translate3d(0, ${-this.currentScroll}px, 0)`;
  }

  render() {
    this.smoothScroll();
  }
}