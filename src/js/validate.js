function isValidEmail(email) {
  const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
  return re.test(email);
}


class Validate {
  /**
   * @param {Array} rulesArr - Array of arrays with two values:
   * 1) Single DOM element like <input> or <textarea> to validate
   * 2) RegExp to test this element
   */
  constructor(rulesArr, submitEl) {
    this.rulesArr = rulesArr;
    this.isAllRight = false;
    this.submitEl = submitEl;
  }

  init() {
    this._addEventListeners();
    this._checkAllRules();
  }

  _addEventListeners() {
    this.rulesArr.forEach((pairArr) => {
      pairArr[0].addEventListener('change', (ev) => {
        const EL = pairArr[0];
        const RE = pairArr[1];

        EL.value = ev.target.value.trim();

        if (EL.attributes.type && EL.attributes.type.value.toLowerCase() === 'email') {
          EL.value = EL.value.toLowerCase();
        }

        if (RE.test(ev.target.value)) {
          EL.classList.remove('input-err');
          EL.classList.add('input-ok');
        } else {
          EL.classList.add('input-err');
          EL.classList.remove('input-ok');
          this.isAllRight = false;
        }
        this._checkAllRules();
      }, false);
    });

    this.submitEl.addEventListener('touchend', (ev) => {
      ev.stopPropagation();
      ev.preventDefault();
      ev.target.click();
    }, false);

    this.submitEl.addEventListener('click', (ev) => {
      ev.preventDefault();
      if (this.isAllRight) {
        this._submitErrorRemove();
      } else {
        this._submitErrorAdd();
      }
    }, false);
  }

  _checkAllRules() {
    const RESULT = this.rulesArr.every(pairArr => pairArr[1].test(pairArr[0].value));
    this.isAllRight = RESULT;
    if (this.isAllRight) {
      this._submitErrorRemove();
    }
    return RESULT;
  }

  isFormValid() {
    return this.isAllRight;
  }

  _submitErrorRemove() {
    this.submitEl.classList.remove('btn--error');
  }

  _submitErrorAdd() {
    this.submitEl.classList.add('btn--error');
  }
}


module.exports = {
  isValidEmail,
  Validate,
};
