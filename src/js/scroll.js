// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (() => window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || function reqAnimFrame(callback) {
    window.setTimeout(callback, 1000 / 60);
  }
)();


function scrollToY(scrollTargetY = 0, speed = 2000, easing = 'easeInOutSine') {
  // scrollTargetY: the target pageYOffset property of the window
  // speed: time in pixels per second
  // easing: easing equation to use

  const { pageYOffset } = window;
  let currentTime = 0;

  // min time .1, max time .8 seconds
  const time = Math.max(0.1, Math.min(Math.abs(pageYOffset - scrollTargetY) / speed, 0.8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  const easingEquations = {
    easeOutSine(pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine(pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },
  };

  // add animation loop
  function tick() {
    currentTime += 1 / 60;

    const p = currentTime / time;
    const t = easingEquations[easing](p);

    if (p < 1) {
      window.requestAnimFrame(tick);
      window.scrollTo(0, pageYOffset + ((scrollTargetY - pageYOffset) * t));
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  }

  // call it once to get started
  tick();
}


module.exports = { scrollToY };
