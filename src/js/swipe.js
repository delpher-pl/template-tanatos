const { moveSlide } = require('./slider.js');

class Swipe {
  constructor(optionsObj) {
    this.detectEl = optionsObj.detectEl;
    this.moveEl = optionsObj.moveEl;
    this.thresholdX = optionsObj.thresholdX || 50;
    this.thresholdY = optionsObj.thresholdY || 180;
    this.thresholdTime = optionsObj.thresholdTime || 1000;
    this.activeSwipe = null;
    this.lastPosX = null;
    this.lastPosY = null;
    this.isSwiping = false;
  }

  init() {
    this.addEventListeners(this.detectEl);
  }

  addEventListeners() {
    this.detectEl.addEventListener('touchstart', (ev) => {
      if (ev.target === this.detectEl) {
        this.begin(ev);
      }
    }, false);
    this.detectEl.addEventListener('mousedown', (ev) => {
      if (ev.target === this.detectEl) {
        this.begin(ev);
      }
    }, false);
    this.detectEl.addEventListener('touchmove', (ev) => {
      this.move(ev);
    }, false);
    this.detectEl.addEventListener('touchend', (ev) => {
      this.end(ev);
    }, false);
    this.detectEl.addEventListener('touchcancel', (ev) => {
      this.end(ev);
    }, false);
    this.detectEl.addEventListener('mouseup', (ev) => {
      this.end(ev);
    }, false);
  }

  begin(ev) {
    this.isSwiping = true;
    this.activeSwipe = {
      beginX: ev.clientX || ev.touches[0].clientX,
      beginY: ev.clientY || ev.touches[0].clientY,
    };
  }

  move(ev) {
    const endX = ev.touches[0].clientX;
    const endY = ev.touches[0].clientY;
    this.lastPosX = endX;
    this.lastPosY = endY;
  }

  end(ev) {
    this.isSwiping = false;

    if (!this.activeSwipe) {
      return;
    }

    this.activeSwipe = Object.assign(this.activeSwipe, {
      endX: ev.clientX || this.lastPosX,
      endY: ev.clientY || this.lastPosY,
    });
    this.lastPos = null;
    this.resolve();
  }

  resolve() {
    const diffX = this.activeSwipe.beginX - this.activeSwipe.endX;
    const diffY = this.activeSwipe.beginY - this.activeSwipe.endY;
    this.activeSwipe = null;

    if (Math.abs(diffX) < this.thresholdX || Math.abs(diffY) > this.thresholdY) {
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
