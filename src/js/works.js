const showMoreBtn = document.querySelector('#works-show-more');
const hiddenItemsEl = document.querySelectorAll('.works__item--hide');

function showItem(el) {
  el.classList.remove('works__item--hide');
}

function hideButton() {
  showMoreBtn.classList.add('works__more--hiding');
  setTimeout(() => {
    showMoreBtn.classList.remove('works__more--hiding');
    showMoreBtn.classList.add('works__more--hide');
  }, 1000);
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
