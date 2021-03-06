const LazyLoad = require('vanilla-lazyload');

/* eslint-disable no-unused-vars */
const lazyLoad = new LazyLoad({
  elements_selector: '.lazy',
});
/* eslint-enable no-unused-vars */

function lazyUpdTimeout() {
  setTimeout(() => {
    lazyLoad.update();
  }, 350);
}

module.exports = {
  lazyLoad,
  lazyUpdTimeout,
};
