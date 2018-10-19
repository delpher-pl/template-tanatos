const menuSection = document.querySelector('#page-menu');
const closeBtn = document.querySelector('#menu-close');
const showBtn = document.querySelector('#header-menu');

const TIMEOUT_MS = 500;
let currentTimeout = null;


function toggleMenuClasses(classesObj, timeoutMs) {
  menuSection.classList.remove(classesObj.removeClass);
  menuSection.classList.add(classesObj.animationClass);

  if (typeof currentTimeout === 'number') {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }

  currentTimeout = setTimeout(() => {
    menuSection.classList.add(classesObj.addClass);
    menuSection.classList.remove(classesObj.animationClass);
  }, timeoutMs);
}

function closeButtonHandler() {
  toggleMenuClasses({
    removeClass: 'page__menu--show',
    animationClass: 'page__menu--hiding',
    addClass: 'page__menu--hide',
  }, TIMEOUT_MS);
}

function showButtonHandler() {
  toggleMenuClasses({
    removeClass: 'page__menu--hide',
    animationClass: 'page__menu--showing',
    addClass: 'page__menu--show',
  }, TIMEOUT_MS);
}


closeBtn.addEventListener('touchend', (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  ev.target.click();
}, false);

closeBtn.addEventListener('click', () => {
  closeButtonHandler();
}, false);

showBtn.addEventListener('touchend', (ev) => {
  ev.stopPropagation();
  ev.preventDefault();
  ev.target.click();
}, false);

showBtn.addEventListener('click', () => {
  showButtonHandler();
}, false);
