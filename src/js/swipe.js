const { moveSlide } = require('./slider.js');

class Swipe {
  constructor(optionsObj) {
    this.detectEl = optionsObj.detectEl;
    this.moveEl = optionsObj.moveEl;
    this.thresholdPx = optionsObj.thresholdPx || 20;
    this.thresholdTime = optionsObj.thresholdTime || 1000;
    this.activeSwipe = null;
    this.lastPos = null;
    this.isSwiping = false;
  }

  init() {
    this.addEventListeners(this.detectEl);
  }

  addEventListeners() {
    this.detectEl.addEventListener('touchstart', (ev) => {
      this.begin(ev);
    });
    this.detectEl.addEventListener('mousedown', (ev) => {
      this.begin(ev);
    });
    this.detectEl.addEventListener('touchmove', (ev) => {
      this.move(ev);
    });
    this.detectEl.addEventListener('touchend', (ev) => {
      this.end(ev);
    });
    this.detectEl.addEventListener('touchcancel', (ev) => {
      this.end(ev);
    });
    this.detectEl.addEventListener('mouseup', (ev) => {
      this.end(ev);
    });
  }

  begin(ev) {
    this.isSwiping = true;
    this.activeSwipe = {
      beginX: ev.clientX || ev.touches[0].clientX,
    };
  }

  move(ev) {
    const endX = ev.touches[0].clientX;
    this.lastPos = endX;
  }

  end(ev) {
    this.isSwiping = false;
    this.activeSwipe = Object.assign(this.activeSwipe, {
      endX: ev.clientX || this.lastPos,
    });
    this.lastPos = null;
    this.resolve();
  }

  resolve() {
    const diffX = this.activeSwipe.beginX - this.activeSwipe.endX;
    this.activeSwipe = null;

    if (Math.abs(diffX) < this.thresholdPx) {
      return;
    }

    if (diffX > 0) {
      moveSlide(1, this.moveEl, true);
    } else {
      moveSlide(-1, this.moveEl, true);
    }
  }
}


module.exports = {
  Swipe,
};
