document.addEventListener('DOMContentLoaded', function (event) {
  const enterName = document.querySelector('#js-enter-name')
  const previewBtn = document.querySelector('#js-preview-btn')
  const blankNameError = document.querySelector('#js-name-blank-error')
  const invalidNameError = document.querySelector('#js-name-invalid-error')
  const previewSteps = document.querySelectorAll('.bk-preview__step')
  const previewStep_1 = document.querySelector('#js-preview-step-1')
  const previewChangeName = document.querySelector('#js-preview-change-name')
  const previewOverlay = document.querySelector('#js-preview-overlay')


  function addError (elem) {
    elem.classList.add('c-input--error')
  }

  function resetError () {
    blankNameError.classList.add('u-hide')
    invalidNameError.classList.add('u-hide')
    enterName.classList.remove('c-input--error')
  }

  function resetPreviewSteps () {
    [...previewSteps].forEach(function(elem){
      elem.classList.remove('bk-preview__step--active');
    });
  }

  function closeChangeName () {
    previewChangeName.classList.remove('bk-preview__change-name--active');
    previewOverlay.classList.remove('bk-preview__overlay--active');
  }

  previewBtn.addEventListener('mousedown', function (e) {
    let target = enterName
    let targetVal = target.value
    resetError()

    console.log(e.currentTarget);

    if (targetVal === '') {
      addError(enterName)
      blankNameError.classList.remove('u-hide')
      console.log('no name')
    } else if (!/^[a-zA-Z]*$/g.test(targetVal)) {
      addError(enterName)
      invalidNameError.classList.remove('u-hide')
      console.log('Invalid')
    }
  })

  enterName.addEventListener('blur', function (e) {
    let target = e.currentTarget
    let targetVal = target.value
    resetError()

    if (!/^[a-zA-Z]*$/g.test(targetVal)) {
      addError(enterName)
      invalidNameError.classList.remove('u-hide')
      console.log('Invalid')
    }

    // console.log(targetValue)
  })

  previewStep_1.addEventListener('mousedown', function (e){
    previewChangeName.classList.add('bk-preview__change-name--active');
    previewOverlay.classList.add('bk-preview__overlay--active');
  });

  [...previewSteps].forEach(function(elem){
    elem.addEventListener('mousedown', function (e){
      resetPreviewSteps()
      e.currentTarget.classList.add('bk-preview__step--active')
    });
  });


})
