
//
// sliderEl argument must have data-currentslide attribute!
//

// IE polyfill
function createNewEvent(eventName) {
  let event;
  if (typeof (Event) === 'function') {
    event = new Event(eventName);
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  return event;
}


function getCurrentSlide(sliderEl) {
  const slidesCount = sliderEl.children.length;
  const currentSlide = +sliderEl.dataset.currentslide;
  return currentSlide % slidesCount;
}

function showslide(pageNumber, sliderEl, isDispatchingEv = false) {
  const SLIDER_EL = sliderEl;
  SLIDER_EL.dataset.currentslide = pageNumber;

  SLIDER_EL.setAttribute(
    'style',
    `transform:translateX(-${100 * pageNumber}%)`,
  );

  if (isDispatchingEv) {
    SLIDER_EL.dispatchEvent(createNewEvent('changeSlide'));
  }
}

function moveSlide(moveSteps, sliderEl, isDispatchingEv = false) {
  const SLIDER_EL = sliderEl;
  const slidesCount = SLIDER_EL.children.length;
  let currentSlide = +SLIDER_EL.dataset.currentslide;
  currentSlide += moveSteps;

  if (currentSlide < 0) {
    currentSlide = slidesCount - 1;
  }
  SLIDER_EL.dataset.currentslide = currentSlide;

  SLIDER_EL.setAttribute(
    'style',
    `transform:translateX(-${(100 * currentSlide) % (slidesCount * 100)}%)`,
  );
  if (isDispatchingEv) {
    SLIDER_EL.dispatchEvent(createNewEvent('changeSlide'));
  }
}

module.exports = {
  getCurrentSlide,
  showslide,
  moveSlide,
};
