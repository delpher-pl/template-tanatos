const { Gallery } = require('./gallery.js');

const worksSection = document.querySelector('#page-works');
const galleryEl = document.querySelector('#page-gallery');

const showMoreBtn = document.querySelector('#works-show-more');
const hiddenItemsEl = document.querySelectorAll('.works__item--hide');
const showMoreContainerEl = document.querySelector('.works__more');


const worksGallery = new Gallery({
  thumbnailsEl: worksSection,
  galleryEl,
  thumbnailsName: 'works',
});
worksGallery.init();


function showItem(el) {
  el.classList.remove('works__item--hide');
}

function hideButton() {
  showMoreBtn.classList.add('works__show-more--hiding');
  showMoreContainerEl.classList.add('works__more--hiding');
  setTimeout(() => {
    showMoreBtn.classList.add('works__show-more--hide');
    showMoreBtn.classList.remove('works__show-more--hiding');
    showMoreContainerEl.classList.add('works__more--hide');
    showMoreContainerEl.classList.remove('works__more--hiding');
  }, 510);
}

function showHiddenItems() {
  Array.prototype.forEach.call(hiddenItemsEl, el => showItem(el));
}


showMoreBtn.addEventListener('touchend', (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  ev.target.click();
}, false);

showMoreBtn.addEventListener('click', () => {
  showHiddenItems();
  hideButton();
}, false);
