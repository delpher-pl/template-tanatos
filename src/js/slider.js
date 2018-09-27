function showslide(pageNumber, sliderEl) {
  sliderEl.setAttribute(
    'style',
    `transform:translateX(-${100 * pageNumber}%)`,
  );
}

function moveSlide(moveSteps, sliderEl) {
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
}

module.exports = {
  showslide,
  moveSlide,
};
