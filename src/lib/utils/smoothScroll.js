// Linear interpolation function

// lerp(10, 20, 0.5) // 15
// where t min/max = 0 to 1
function lerp(start, end, t) {
  return start * (1 - t) + end * t; // 10 * (1 - 0.5) + 20 * 0.5  --> 10 * 0.5 + 20 * 0.5 -> 5 + 10
}

export default class SmoothScroll {
  constructor() {
    this.scrollable = document.querySelector('.scroll');
    this.previousScroll = 0
    this.currentScroll = 0;
    this.scrollTarget = 0;
    this.scrollDirection = 0;
    this.scrollDelta = 0;
    this.ease = 0.075;

    this.eventListeners();

  }

  eventListeners() {
    window.addEventListener('load', () => {
      document.body.style.height = `${this.scrollable.getBoundingClientRect().height}px`;
    });

    window.addEventListener('resize', () => {
      document.body.style.height = `${this.scrollable.getBoundingClientRect().height}px`;
    });
  }

  render() {
    this.scrollTarget = window.scrollY;
    this.previousScroll = this.currentScroll;
    this.currentScroll = lerp(Math.floor(this.currentScroll), this.scrollTarget, this.ease);
    this.scrollable.style.transform = `translate3d(0, ${-this.currentScroll}px, 0)`;
    this.scrollDirection = Math.sign(this.scrollTarget - this.previousScroll);
    this.scrollDelta = this.scrollTarget - this.currentScroll;

    window.requestAnimationFrame(() => this.render());
  }

}