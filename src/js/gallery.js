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

  move(offsetX, offsetY) {
    this.galleryPhoto.attributes.style.value = `transform: translate(-${offsetX}px, -${offsetY}px)`;
  }

  _findElements() {
    this.galleryPhotoContainer = this.galleryEl.querySelector(`.${this.galleryName}__photo-container`);
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

  _attachEvents() {
    this.thumbnailsEl.addEventListener('click', (ev) => {
      if (ev.target.classList.contains(`${this.thumbnailsName}__button`)) {
        this.show(ev);
      }
    }, false);

    this.galleryPhotoContainer.addEventListener('mousemove', (ev) => {
      const windowX = window.innerWidth;
      const windowY = window.innerHeight;
      const photoSizes = this.galleryPhoto.getBoundingClientRect();

      let offsetX = ev.clientX * ((photoSizes.width - windowX) / windowX);
      offsetX = Math.max(offsetX, 0);
      let offsetY = ev.clientY * ((photoSizes.height - windowY) / windowY);
      offsetY = Math.max(offsetY, 0);

      this.move(offsetX, offsetY);
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
