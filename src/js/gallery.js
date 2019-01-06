function findContainer(childEl, className) {
  let tempEl = childEl.parentNode;
  while (!tempEl.classList.contains(className)) {
    tempEl = tempEl.parentNode;
  }
  return tempEl;
}


class Gallery {
  constructor({
    thumbnailsEl,
    galleryEl,
    galleryName,
    thumbnailsName,
    fullImageSuffix,
  }) {
    this.galleryEl = galleryEl;
    this.thumbnailsEl = thumbnailsEl;
    this.galleryName = galleryName || 'gallery';
    this.thumbnailsName = thumbnailsName;
    this.fullImageSuffix = fullImageSuffix || '_full';
    this.isTouchmoveEv = false;
    this.isNewTouch = true;
    this.touchmoveData = {
      beginX: null,
      beginY: null,
      endX: null,
      endY: null,
    };
    this.imgSizeX = 0;
    this.imgSizeY = 0;
  }

  show(ev) {
    this.update(ev);

    document.body.classList.add(`${this.galleryName}__is-displayed`);
    this.galleryEl.classList.remove(`page__${this.galleryName}--hide`);
    this.galleryEl.classList.add(`page__${this.galleryName}--showing`);

    setTimeout(() => {
      this.galleryEl.classList.remove(`page__${this.galleryName}--showing`);
    }, 500);
  }

  hide() {
    document.body.classList.remove(`${this.galleryName}__is-displayed`);
    this.galleryEl.classList.add(`page__${this.galleryName}--hiding`);
    setTimeout(() => {
      this.galleryEl.classList.remove(`page__${this.galleryName}--hiding`);
      this.galleryEl.classList.add(`page__${this.galleryName}--hide`);
    }, 500);
  }

  move(offset, offsetY) {
    if (typeof offset === 'object') {
      this.galleryPhoto.attributes.style.value = `transform: translate(${offset.x}px, ${offset.y}px)`;
    } else {
      this.galleryPhoto.attributes.style.value = `transform: translate(${offset}px, ${offsetY}px)`;
    }
  }

  _updateImgSize() {
    this.imgSizeX = this._getImageEl().clientWidth;
    this.imgSizeY = this._getImageEl().clientHeight;
  }

  _resize() {
    this.galleryPhoto.removeAttribute('height');
    this.galleryPhoto.removeAttribute('width');

    if (
      (this.galleryPhoto.naturalWidth / this.galleryPhotoContainer.clientWidth)
      > (this.galleryPhoto.naturalHeight / this.galleryPhotoContainer.clientHeight)
    ) {
      this.galleryPhoto.setAttribute('height', '100%');
    } else {
      this.galleryPhoto.setAttribute('width', '100%');
    }

    this._updateImgSize();
  }

  _findElements() {
    this.galleryPhotoContainer = this.galleryEl.querySelector(`.${this.galleryName}__photo-container`);
    this.galleryTopBar = this.galleryEl.querySelector(`.${this.galleryName}__top`);
    this.galleryTitle = this.galleryEl.querySelector(`#${this.galleryName}-title`);
    this.galleryPhoto = this.galleryEl.querySelector(`#${this.galleryName}-photo`);
    this.galleryPrev = this.galleryEl.querySelector(`#${this.galleryName}-prev`);
    this.galleryNext = this.galleryEl.querySelector(`#${this.galleryName}-next`);
    this.galleryClose = this.galleryEl.querySelector(`#${this.galleryName}-close`);
    this.thumbnailsItems = this.thumbnailsEl.querySelectorAll(`.${this.thumbnailsName}__item`);
  }

  _toFullSizeFilename(url) {
    const tempUrl = url.split('.');
    return `${tempUrl[0]}${this.fullImageSuffix}.${tempUrl[1]}`;
  }

  _getItemFromIndex(index) {
    return this.thumbnailsItems[index];
  }

  _getIndex() {
    const regex = new RegExp(`(${this.thumbnailsName}|${this.thumbnailsName.slice(0, -1)})_\\d+`, 'gi');
    const items = Array.from(this.thumbnailsItems);
    const currentFilename = this.galleryPhoto.attributes.src.value;

    return items.findIndex(
      (el) => {
        const tempFilename = el.querySelector('.works__bgimg').attributes.src.value;
        const tempMatch = tempFilename.match(regex);
        const currentMatch = currentFilename.match(regex);

        if (!tempMatch || !currentMatch) {
          return false;
        }

        return tempMatch[0] === currentMatch[0];
      },
    );
  }

  _setImage(index) {
    const itemEl = this._getItemFromIndex(index);
    const itemTitleEl = itemEl.querySelector(`.${this.thumbnailsName}__title`);
    const itemPhotoEl = itemEl.querySelector(`.${this.thumbnailsName}__bgimg`);
    const fullSizeFilename = this._toFullSizeFilename(itemPhotoEl.attributes.src.value);

    this.galleryTitle.innerText = itemTitleEl.innerText;
    this.galleryPhoto.attributes.src.value = fullSizeFilename;
  }

  _getImageEl() {
    return this.galleryPhoto;
  }

  prev() {
    let offset;

    if (this._getIndex() === 0) {
      offset = this.imagesCount - 1;
    } else {
      offset = (this._getIndex() - 1) % this.imagesCount;
    }

    this._setImage(offset);
  }

  next() {
    this._setImage((this._getIndex() + 1) % this.imagesCount);
  }

  _limitMove(xOffset, yOffset) {
    return {
      x: Math.min(0, Math.max(xOffset, -this.imgSizeX + window.innerWidth)),
      y: Math.min(0, Math.max(
        yOffset,
        -this.imgSizeY + window.innerHeight - this.galleryTopBar.clientHeight,
      )),
    };
  }

  _getOffset() {
    const styleVal = this.galleryPhoto.attributes.style.value;
    const currentVal = styleVal.match(/translate\((.*)\)/)[1].split(/\s*,\s*/) || ['0px', '0px'];

    return {
      x: +((currentVal[0] || '0px').match(/^-?\d+/)[0] || 0),
      y: +((currentVal[1] || '0px').match(/^-?\d+/)[0] || 0),
    };
  }

  _getDelta() {
    return {
      x: (this.touchmoveData.endX || 0) - (this.touchmoveData.beginX || 0),
      y: (this.touchmoveData.endY || 0) - (this.touchmoveData.beginY || 0),
    };
  }

  _calcMove(isCalcDelta = true) {
    const offset = this._getOffset();
    const delta = isCalcDelta ? this._getDelta() : { x: 0, y: 0 };

    return this._limitMove(offset.x + delta.x, offset.y + delta.y);
  }

  _beginMove(ev) {
    this.isNewTouch = true;
    this.touchmoveData.beginX = (ev.touches && ev.touches[0].clientX) || ev.clientX || 0;
    this.touchmoveData.beginY = (ev.touches && ev.touches[0].clientY) || ev.clientY || 0;
  }

  _duringMove(ev) {
    if (!this.isNewTouch) {
      this.touchmoveData.beginX = this.touchmoveData.endX || this.touchmoveData.beginX;
      this.touchmoveData.beginY = this.touchmoveData.endY || this.touchmoveData.beginY;
    }

    const tempX = (ev.touches && ev.touches[0] && ev.touches[0].clientX) || ev.clientX || 0;
    const tempY = (ev.touches && ev.touches[0] && ev.touches[0].clientY) || ev.clientY || 0;

    this.touchmoveData.endX = tempX;
    this.touchmoveData.endY = tempY;

    this.move(this._calcMove());
    this.isNewTouch = false;
  }

  _attachEvents() {
    this.thumbnailsEl.addEventListener('click', (ev) => {
      if (ev.target.classList.contains(`${this.thumbnailsName}__button`)) {
        this.show(ev);
      }
    }, false);

    this.galleryPhotoContainer.addEventListener('mousemove', (ev) => {
      if (this.isTouchmoveEv) {
        return;
      }

      const windowX = window.innerWidth;
      const windowY = window.innerHeight;
      const photoSizes = this.galleryPhoto.getBoundingClientRect();

      let offsetX = ev.clientX * ((photoSizes.width - windowX) / windowX);
      offsetX = Math.max(offsetX, 0);
      let offsetY = ev.clientY * ((photoSizes.height - windowY) / windowY);
      offsetY = Math.max(offsetY, 0);

      this.move(-offsetX, -offsetY);
    }, false);

    this.galleryPrev.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.prev();
    }, false);

    this.galleryNext.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.next();
    }, false);

    this.galleryClose.addEventListener('click', () => this.hide(), false);

    this.galleryPhotoContainer.addEventListener('touchstart', (ev) => {
      this.isTouchmoveEv = true;
      this._beginMove(ev);
    }, { capture: false, passive: true });

    this.galleryPhotoContainer.addEventListener('touchmove', (ev) => {
      this._duringMove(ev);
    }, { capture: false, passive: true });

    this.galleryPhotoContainer.addEventListener('touchend', (ev) => {
      ev.preventDefault();
      this.isTouchmoveEv = false;
    }, false);

    this._getImageEl().addEventListener('load', () => {
      this._resize();
      this._updateImgSize();
      this.move(this._calcMove(false));
    });

    window.addEventListener('resize', () => {
      const isGalleryDisplayed = document.body.classList.contains(`${this.galleryName}__is-displayed`);

      if (isGalleryDisplayed) {
        this.move(this._calcMove(false));
      }

      this._resize();
    }, false);
  }

  update(ev) {
    const itemEl = findContainer(ev.target, `${this.thumbnailsName}__item`);
    const itemTitle = itemEl.querySelector(`.${this.thumbnailsName}__title`);
    const itemImgName = itemEl.querySelector(`.${this.thumbnailsName}__bgimg`).attributes.src.value;
    const fullImageName = itemImgName.split('.').join(`${this.fullImageSuffix}.`);
    this.galleryEl.querySelector(`#${this.galleryName}-title`).innerText = itemTitle.innerText;
    this.galleryEl.querySelector(`#${this.galleryName}-photo`).attributes.src.value = fullImageName;
  }

  init() {
    this._findElements();
    this.imagesCount = this.thumbnailsItems.length;
    this._attachEvents();
  }
}


module.exports = {
  Gallery,
};
